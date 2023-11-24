/*
Import the Spheron Storage SDK
This SDK is used to interact with the Spheron network for file storage and retrieval.
*/
import { SpheronClient, ProtocolEnum } from "@spheron/storage";

/* 
Import the node-fetch module
This module allows us to make HTTP requests similar to the Fetch API in the browser.
*/
import fetch from "node-fetch"; // Using ES6 import

/* 
Import the chalk module
Chalk is a library that allows us to add color to our console log output for better readability and aesthetics.
*/
import chalk from "chalk";

/* 
Import the cli-table3 module
This module is used to create table-like structures in the console. It's useful for displaying data in a structured format.
*/
import Table from "cli-table3";

/*
Import the figlet module
Figlet is used to create ASCII art from text. It's often used to display large headings or logos in the console.
*/
import figlet from "figlet";

/* 
This is your authentication token for the Spheron network. It is a JWT (JSON Web Token) that contains 
encoded details such as the API key and other information needed to authenticate your requests.
*/
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI4YzlmOWY5NjQ1MDY3YjZmYTJmYmMzZmVjZDY0NzQ3OGFhY2RmOWY2MjE4MzNiN2EzYTFkODA3NTNhNTBhNGEzYmJmNDg1MjU0OGRiYTQ0NjdhYzQxOTliNjViZTBiMmY1YzJiM2JhNTIyNjVmZmI0ZTdhZmE4M2NlMTM2M2JmNCIsImlhdCI6MTY5OTQ2MzA4NywiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.5MuWMwntiVu9W1Vyxzfk9TOdnSPmwB8O6dCdadbmIlE"; // Replace with your actual token

/* 
Here you are creating a new instance of the SpheronClient, passing in an object with your token. This client will 
be used to interact with the Spheron network's API, allowing you to upload files to IPFS and perform other actions. The client 
uses the token to authenticate your requests.
*/
const client = new SpheronClient({ token });

/* 
This line sets the file path for the JSON file that you want to upload. The './' indicates that the file is located in 
the current directory from where the script is being run. 'metadata.json' is the name of the file you are targeting for upload.
*/
const filePath = "./metadata.json";

/* 
This is an asynchronous function named 'uploadFileToIPFS' which takes a 'configuration' object as an argument.
The function is designed to upload a file to IPFS using the SpheronClient instance.
*/
async function uploadFileToIPFS(configuration) {
  // The 'await' keyword is used to wait for the promise returned by 'client.upload()' to resolve.
  // The 'client.upload()' function is called with 'filePath' (the path to the JSON file) and the 'configuration' object.
  // The result of the promise is stored in 'uploadResponse'.
  const uploadResponse = await client.upload(filePath, configuration);

  // A string template is used to include the 'uploadId' from the 'uploadResponse' in the console log.
  console.log(
    chalk.green(
      `🚀 File uploaded successfully with ID: ${uploadResponse.uploadId}`
    )
  );

  // The function returns the entire 'uploadResponse' object which contains details about the upload process.
  // This returned object can be used later, for example, to retrieve the 'protocolLink' to access the uploaded file.
  return uploadResponse;
}

/* This is an asynchronous function named 'fetchFromIPFS' which takes a 'protocolLink' as an argument.
The function is designed to fetch JSON data from an IPFS link.
*/
async function fetchFromIPFS(protocolLink) {
  // The 'jsonFileUrl' is constructed by appending '/metadata.json' to the 'protocolLink'.
  // This creates the full URL to the JSON file stored on IPFS.
  const jsonFileUrl = `${protocolLink}/metadata.json`;
  console.log(
    chalk.magenta(`🚀 Link to the JSON Data uploaded: `),
    jsonFileUrl
  );

  try {
    // The 'await' keyword is used to wait for the fetch promise to resolve.
    // The 'fetch()' function is called with 'jsonFileUrl' to make an HTTP GET request to that URL.
    const response = await fetch(jsonFileUrl);

    // If the HTTP response status is not 'ok' (which usually means status code 200),
    // an error is thrown with the status code included in the error message.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If the response is 'ok', the JSON data is parsed from the response using 'response.json()'.
    // The parsed JSON data is stored in 'jsonData'.
    const jsonData = await response.json();

    // The function returns the parsed JSON data.
    return jsonData;
  } catch (error) {
    // If an error occurs during the fetch or JSON parsing
    console.error(chalk.red("❌ Error fetching data from IPFS:"), error);

    // The error is then rethrown to be handled by the caller of the function.
    // This allows the caller to implement their own error handling logic.
    throw error;
  }
}

/* 
This function uses 'figlet' to create ASCII art from the provided text and 'chalk' to color it yellow.
It's used to display a heading in a stylized font in the console.
*/
function displayHeading(text) {
  console.log(
    chalk.yellow(figlet.textSync(text, { horizontalLayout: "full" }))
  );
}

/*
This function takes JSON data as input and uses 'cli-table3' to format it into a table.
Each key-value pair in the JSON is added as a row in the table with blue headers.
It's used to display JSON data in a structured and readable table format in the console.
*/
function displayJsonAsTable(jsonData) {
  const table = new Table({
    head: [chalk.blue("Key"), chalk.blue("Value")],
    colWidths: [30, 110],
  });

  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      table.push([key, jsonData[key]]);
    }
  }

  console.log(table.toString());
}

// Example usage
(async () => {
  displayHeading("Spheron - Storage 🌐");
  try {
    // Define the configuration for the upload
    const configuration = {
      name: "metadata upload",
      protocol: ProtocolEnum.IPFS,
      onUploadInitiated: (uploadId) => {
        console.log(chalk.magenta(`🔗 Upload initiated with ID: ${uploadId}`));
      },
      onChunkUploaded: (uploadedSize, totalSize) => {
        console.log(
          chalk.blue(`📦 Uploaded chunk: ${uploadedSize}/${totalSize}`)
        );
      },
    };

    // Upload the file and get the uploadResponse
    const uploadResponse = await uploadFileToIPFS(configuration);

    // Log the upload information
    console.log(chalk.green(`📝 Upload Information:`));
    displayJsonAsTable(uploadResponse);

    // Fetch and display the uploaded JSON file from IPFS
    const fetchedJsonData = await fetchFromIPFS(uploadResponse.protocolLink);
    console.log(chalk.green("✅ Fetched JSON data from the above link:"));
    displayJsonAsTable(fetchedJsonData);
  } catch (error) {
    console.error(chalk.red("❗ Error during the process:"), error);
  }
})();
