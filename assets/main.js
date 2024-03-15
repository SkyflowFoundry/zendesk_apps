(async function () {
  var client = ZAFClient.init();
  client.invoke("resize", { width: "100%", height: "200px" });
  const response = await client.get("ticket");
  console.log(response);
  var ticket = response.ticket;
  var name = ticket.requester.name;
  var email = ticket.requester.email;
  showInfo(name, email);
})();

async function showInfo(name, email) {
  var requester_data = {
    name: name,
    email: email,
  };
  var source = document.getElementById("requester-template").innerHTML;
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  document.getElementById("content").innerHTML = html;
}

document
  .getElementById("detokenize")
  .addEventListener("click", async function () {
    var client = ZAFClient.init();
    var email = document.getElementById("email").innerText;
    var name = document.getElementById("name").innerText;
    const agent_details = await client.get("currentUser");
    var locale = agent_details.currentUser.locale;
    console.log("User locale:", locale);
    console.log(email);
    //console.log(name);
    let data = JSON.stringify({
      detokenizationParameters: [
        {
          token: email,
          redaction: "PLAIN_TEXT",
        },
        {
          token: name,
          redaction: "PLAIN_TEXT",
        },
      ],
      downloadURL: false,
    });
    if (email) {
      const options = {
        url: "https://{{setting.vault_subdomain}}.vault.skyflowapis.com/v1/vaults/{{setting.vaultID}}/detokenize",
        type: "POST",
        cors: false,
        secure: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer {{setting.apikey}}",
        },
        data,
      };

      client
        .request(options)
        .then((response) => {
          // Check if the response status is OK (status code 200)
          console.log(response);
          return response;
        })
        .then((data) => {
          // Log the response data
          var email = data.records[0].value;
          var name = data.records[1].value;
          console.log(email);
          console.log(name);
          showInfo(name, email);
        })
        .catch((error) => {
          console.error("Error:", error);
          var email = "Not found or not authorized";
          var name = "Not found or not authorized";
          showInfo(name, email);
        });
    } else {
      console.error("User cannot be detokenized");
    }
  });
