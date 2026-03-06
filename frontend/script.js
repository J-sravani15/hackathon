async function processQuote() {

  const requestData = {

    Driver_Age: parseInt(document.getElementById("Driver_Age").value),
    Driving_Exp: parseInt(document.getElementById("Driving_Exp").value),
    Prev_Accidents: parseInt(document.getElementById("Prev_Accidents").value),
    Prev_Citations: parseInt(document.getElementById("Prev_Citations").value),

    Coverage: document.getElementById("Coverage").value,
    Veh_Usage: document.getElementById("Veh_Usage").value,
    Annual_Miles_Range: document.getElementById("Annual_Miles_Range").value,
    Vehicle_Cost_Range: document.getElementById("Vehicle_Cost_Range").value,
    Sal_Range: document.getElementById("Sal_Range").value,

    Quoted_Premium: parseFloat(document.getElementById("Quoted_Premium").value)

  };

  /* Pipeline status */

  document.getElementById("agent1").innerHTML = "Running...";
  document.getElementById("agent2").innerHTML = "Waiting";
  document.getElementById("agent3").innerHTML = "Waiting";
  document.getElementById("agent4").innerHTML = "Waiting";

  try {

    const response = await fetch("http://127.0.0.1:8000/predict", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)

    });

    const result = await response.json();

    /* Pipeline completed */

    document.getElementById("agent1").innerHTML = "Completed";
    document.getElementById("agent2").innerHTML = "Completed";
    document.getElementById("agent3").innerHTML = "Completed";
    document.getElementById("agent4").innerHTML = "Completed";

    /* Results */

    document.getElementById("risk").innerHTML =
      "Risk Tier : " + result.risk_level;

    document.getElementById("probability").innerHTML =
      "Model Confidence : " + result.conversion_probability;

    document.getElementById("premium").innerHTML =
      "$" + result.recommended_premium + "/yr";

    document.getElementById("decision").innerHTML =
      "Decision : " + result.decision;

    /* Analytics bars */

    const exp = requestData.Driving_Exp || 0;
    const accidents = requestData.Prev_Accidents || 0;
    const vehicle = requestData.Vehicle_Cost_Range;

    document.getElementById("driverExpBar").style.width = (exp * 5) + "%";
    document.getElementById("accidentBar").style.width = (accidents * 20) + "%";

    if (vehicle === "Low") {
      document.getElementById("vehicleBar").style.width = "30%";
    }
    else if (vehicle === "Medium") {
      document.getElementById("vehicleBar").style.width = "60%";
    }
    else if (vehicle === "High") {
      document.getElementById("vehicleBar").style.width = "90%";
    }

  }

  catch (error) {

    alert("Backend server not running");
    console.error(error);

  }

}