async function processQuote(){

const requestData = {

Driver_Age: parseInt(document.getElementById("Driver_Age").value),
Driving_Exp: parseInt(document.getElementById("Driving_Exp").value),
Prev_Accidents: parseInt(document.getElementById("Prev_Accidents").value),
Prev_Citations: parseInt(document.getElementById("Prev_Citations").value),
Coverage: parseInt(document.getElementById("Coverage").value),
Veh_Usage: parseInt(document.getElementById("Veh_Usage").value),
Annual_Miles_Range: parseInt(document.getElementById("Annual_Miles_Range").value),
Vehicle_Cost_Range: parseInt(document.getElementById("Vehicle_Cost_Range").value),
Sal_Range: parseInt(document.getElementById("Sal_Range").value),
Quoted_Premium: parseFloat(document.getElementById("Quoted_Premium").value)

}

document.getElementById("agent1").innerHTML="Risk Profiler: Running..."

try{

const response = await fetch("http://127.0.0.1:8000/predict",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(requestData)
})

const result = await response.json()

document.getElementById("agent1").innerHTML="Risk Profiler: Completed"
document.getElementById("agent2").innerHTML="Conversion Predictor: Completed"
document.getElementById("agent3").innerHTML="Premium Advisor: Completed"
document.getElementById("agent4").innerHTML="Decision Router: Completed"

document.getElementById("risk").innerHTML="Risk Tier: "+result.risk
document.getElementById("probability").innerHTML="Conversion Probability: "+result.probability
document.getElementById("premium").innerHTML="Premium: ₹"+result.premium
document.getElementById("decision").innerHTML="Decision: "+result.decision

}catch(error){

alert("Backend server not running")

}

}