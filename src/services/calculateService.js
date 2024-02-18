import operationMap from "../constants/operationMap";

const performCalculation = async (operands, operation) => {
  const mappedOperation = operationMap[operation] || "unknown";
  try {
    const backendUrl =
      process.env.REACT_APP_BACKEND_URL || "http://0.0.0.0:8000";
    const payload = {
      operation: [mappedOperation],
      operands: operands.map(Number),
    };
    const response = await fetch(`${backendUrl}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error performing calculation:", error);
    throw error;
  }
};

export default performCalculation;
