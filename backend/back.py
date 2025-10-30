from flask import Flask, request, jsonify
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
import logging
import os
from dotenv import load_dotenv
from flask_cors import CORS  # Importing CORS from flask_cors

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


PERSIST_DIRECTORY = "doc_db"


embedding = HuggingFaceEmbeddings()


def load_vectorstore():
    try:
        vectorstore = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embedding)
        logger.info("Vector store loaded successfully.")
        return vectorstore
    except Exception as e:
        logger.error(f"Failed to load vector store: {e}")
        raise

def setup_qa_chain():
    try:
        vectorstore = load_vectorstore()
        retriever = vectorstore.as_retriever()
        llm = ChatGroq(model="llama-3.2-3b-preview", temperature=0.4)
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True
        )
        logger.info("QA chain setup completed.")
        return qa_chain
    except Exception as e:
        logger.error(f"Failed to set up QA chain: {e}")
        raise


app = Flask(__name__)


CORS(app, supports_credentials=True)  


qa_chain = setup_qa_chain()
system_prompt = "You are a descriptive/essay writing expert or coach, you are required to provide a concise paragraphed answer for the question "


@app.route("/query", methods=["POST"])
def query_document():
    try:
        
        data = request.get_json()
        if not data or "query" not in data:
            return jsonify({"error": "Query is required"}), 400

        query = data["query"]
        full_query = system_prompt + query
        logger.info(f"Processing query: {full_query}")
        
        
        response = qa_chain.invoke({"query": query})
        return jsonify({
            "query": query,
            "result": response["result"]
        })
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        return jsonify({"error": f"An error occurred: {e}"}), 500


@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Document QA API is running!"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
