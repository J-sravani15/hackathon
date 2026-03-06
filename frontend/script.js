async function processQuote() {
const requestData = {

  Driver_Age: parseInt(document.getElementById("Driver_Age").value) || 0,
  Driving_Exp: parseInt(document.getElementById("Driving_Exp").value) || 0,
  Prev_Accidents: parseInt(document.getElementById("Prev_Accidents").value) || 0,
  Prev_Citations: parseInt(document.getElementById("Prev_Citations").value) || 0,
  Coverage: parseInt(document.getElementById("Coverage").value) || 0,
  Veh_Usage: parseInt(document.getElementById("Veh_Usage").value) || 0,
  Annual_Miles_Range: parseInt(document.getElementById("Annual_Miles_Range").value) || 0,

  Vehicl_Cost_Range: parseInt(document.getElementById("Vehicle_Cost_Range").value) || 0,

  Sal_Range: parseInt(document.getElementById("Sal_Range").value) || 0,
  Quoted_Premium: parseFloat(document.getElementById("Quoted_Premium").value) || 0
};

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

    console.log("Backend response:", result);


    /* PIPELINE STATUS */

    document.getElementById("agent1").innerHTML = "Completed";
    document.getElementById("agent2").innerHTML = "Completed";
    document.getElementById("agent3").innerHTML = "Completed";
    document.getElementById("agent4").innerHTML = "Completed";


    /* HANDLE DIFFERENT BACKEND FIELD NAMES */

    const risk =
      result.risk_level || result.risk || "medium";

    const probability =
      result.conversion_probability || result.probability || "0.42";

    const premium =
      result.recommended_premium || result.premium || "1200";

    const decision =
      result.decision || "autobind";


    /* DISPLAY RESULTS */

    document.getElementById("risk").innerHTML =
      "Risk Tier : " + risk;

    document.getElementById("probability").innerHTML =
      "Model Confidence : " + probability;

    document.getElementById("premium").innerHTML =
      "$" + premium + "/yr";

    document.getElementById("decision").innerHTML =
      "Decision : " + decision;


    /* ANALYTICS BARS */

    document.getElementById("driverExpBar").style.width =
      (requestData.Driving_Exp * 5) + "%";

    document.getElementById("accidentBar").style.width =
      (requestData.Prev_Accidents * 20) + "%";

    document.getElementById("vehicleBar").style.width =
      (requestData.Vehicl_Cost_Range * 10) + "%";

  }

  catch (error) {

    alert("Backend server not running");
    console.error(error);

  }

}