import operationMap from "../constants/operationMap";

const performCalculation = async (operands, operation) => {
  const operationQueryParam = operationMap[operation] || "unknown";
  try {
    const backendUrl =
      process.env.REACT_APP_BACKEND_URL || "http://0.0.0.0:8000";

    const response = await fetch(
      `${backendUrl}/calculate?operation=${operationQueryParam}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operands.map(Number)),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error performing calculation:", error);
    throw error;
  }
};

export default performCalculation;
