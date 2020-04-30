let newDate = new Date();

const apiKey = "c784465342856b329aec22d7961186d4";
const apiAddress = "http://api.openweathermap.org/data/2.5/weather?zip=";

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const getFromKey = async (zip, key) => {
  const response = await fetch(apiAddress + zip + ",IN&appid=" + key);
  console.log(response);
  try {
    const data = await response.json();
    // console.log("data successfully retrieved from the external API");
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

document.getElementById("generate").addEventListener("click", function (event) {
  let newZip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  getFromKey(newZip, apiKey).then(function (data) {
    postData("/addPost", {
      date: newDate,
      content: feelings,
      temp: data.main.temp,
    }).then(updateUI());
  });
});

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    let allData = await request.json();
    document.getElementById("date").innerHTML = "date: " + allData.date;
    document.getElementById("temp").innerHTML = "temp: " + allData.temp + "K";
    document.getElementById("content").innerHTML =
      "feelings: " + allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
