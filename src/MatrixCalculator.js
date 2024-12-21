import React, { useState } from "react";

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState([[0, 0], [0, 0]]);
  const [result, setResult] = useState([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState("+");

  const handleInputChange = (value, matrix, row, col) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = value;

    if (matrix === matrixA) {
      setMatrixA(updatedMatrix);
    } else {
      setMatrixB(updatedMatrix);
    }
  };

  const handleKeyDown = (e, matrix, row, col) => {
    const currentValue = matrix[row][col].toString();

    // Handle number input (0-9) and Backspace
    if (e.key >= "0" && e.key <= "9") {
      const newValue = currentValue === "0" ? e.key : `${currentValue}${e.key}`;
      handleInputChange(newValue, matrix, row, col);
    } else if (e.key === "Backspace") {
      // Remove last character on Backspace
      const newValue = currentValue.slice(0, -1) || "0"; // Ensure it doesn't become empty
      handleInputChange(newValue, matrix, row, col);
    }
  };

  const calculateResult = () => {
    let newResult;
    if (operation === "+") {
      newResult = matrixA.map((row, i) =>
        row.map((val, j) => parseInt(val) + parseInt(matrixB[i][j]))
      );
    } else if (operation === "-") {
      newResult = matrixA.map((row, i) =>
        row.map((val, j) => parseInt(val) - parseInt(matrixB[i][j]))
      );
    } else if (operation === "x") {
      newResult = [
        [
          parseInt(matrixA[0][0]) * parseInt(matrixB[0][0]) + parseInt(matrixA[0][1]) * parseInt(matrixB[1][0]),
          parseInt(matrixA[0][0]) * parseInt(matrixB[0][1]) + parseInt(matrixA[0][1]) * parseInt(matrixB[1][1]),
        ],
        [
          parseInt(matrixA[1][0]) * parseInt(matrixB[0][0]) + parseInt(matrixA[1][1]) * parseInt(matrixB[1][0]),
          parseInt(matrixA[1][0]) * parseInt(matrixB[0][1]) + parseInt(matrixA[1][1]) * parseInt(matrixB[1][1]),
        ],
      ];
    }
    setResult(newResult);
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      background: "url('/awan.jpg') no-repeat center center fixed",  // Update path to your image
      backgroundSize: "cover",  // Ensures the image covers the entire background
      color: "#black",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 4px 20px rgba(4, 41, 249, 0.8)",
      maxWidth: "700px",
      margin: "50px auto",
      position: "relative",
      overflow: "hidden",
    },
    title: {
      marginBottom: "20px",
      fontSize: "36px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    matrixContainer: {
      display: "flex",
      justifyContent: "space-around",
      margin: "20px 0",
    },
    matrix: {
      margin: "10px",
    },
    matrixRow: {
      display: "flex",
      justifyContent: "center",
    },
    input: {
      width: "60px",
      height: "50px",
      margin: "5px",
      border: "2px solid #00FFFF", // Bright cyan border
      textAlign: "center",
      borderRadius: "5px",
      fontSize: "20px",
      fontWeight: "bold",
      outline: "none",
      boxShadow: "0 0 10px #ADD8E6", // Light blue shadow
      color: "black",
      backgroundColor: "transparent", // Transparent background
    },
    buttons: {
      margin: "20px 0",
    },
    button: {
      backgroundColor: "transparent",
      color: "black",
      padding: "15px 30px",
      margin: "0 10px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
      border: "2px solid #00FFFF",
    },
    dropdown: {
      fontSize: "18px",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "5px",
      margin: "0 10px",
      backgroundColor: "transparent",
      color: "black",
      border: "2px solid #00FFFF",
    },
    result: {
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Matrix Calculator</h1>
      <h2>By Narginda</h2>
      <div style={styles.matrixContainer}>
        <div style={styles.matrix}>
          <h3>Matrix A</h3>
          {[0, 1].map((row) => (
            <div key={`rowA-${row}`} style={styles.matrixRow}>
              {[0, 1].map((col) => (
                <input
                  key={`A-${row}-${col}`}
                  type="text"
                  value={matrixA[row][col]}
                  onKeyDown={(e) => handleKeyDown(e, matrixA, row, col)}
                  style={styles.input}
                />
              ))}
            </div>
          ))}
        </div>
        <div style={styles.matrix}>
          <h3>Matrix B</h3>
          {[0, 1].map((row) => (
            <div key={`rowB-${row}`} style={styles.matrixRow}>
              {[0, 1].map((col) => (
                <input
                  key={`B-${row}-${col}`}
                  type="text"
                  value={matrixB[row][col]}
                  onKeyDown={(e) => handleKeyDown(e, matrixB, row, col)}
                  style={styles.input}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.buttons}>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.dropdown}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="x">x</option>
        </select>
        <button style={styles.button} onClick={calculateResult}>
          Submit
        </button>
      </div>

      <div style={styles.result}>
        <h3>Result</h3>
        {[0, 1].map((row) => (
          <div key={`rowResult-${row}`} style={styles.matrixRow}>
            {[0, 1].map((col) => (
              <input
                key={`Result-${row}-${col}`}
                type="number"
                value={result[row][col]}
                readOnly
                style={styles.input}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixCalculator;
