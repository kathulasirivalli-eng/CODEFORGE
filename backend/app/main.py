from fastapi import FastAPI

app = FastAPI(title="CODEFORGE API")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "CODEFORGE backend"}

@app.get("/execution-status")
def execution_status():
    return {
        "status": "unavailable",
        "message": "Secure execution service is not configured. Add a trusted runner API to enable unsafe code execution safely."
    }
