# Spheron Storage Example

## Overview

This repository provides a step-by-step guide on using the Spheron Storage SDK to upload and retrieve metadata on the decentralized web through IPFS. Metadata is essential for various use cases, including creating dynamic NFTs and storing data securely on a decentralized network.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Medium Article](#medium-article)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

You'll also need a Spheron authentication token. You can obtain this token by signing up on the [Spheron website](https://spheron.network/) and generating an API key.

## Getting Started

1. Clone this repository to your local machine:

```bash
git clone https://github.com/spheronFdn/metadata-uploader.git
 ```

2. Navigate to the repository directory:

```bash
cd spheron-storage-example
```

3. Install the required dependencies:

```bash
npm install
```

3. Open the index.js file and replace the token variable with your Spheron authentication token.

## Usage
To run the example code, execute the following command:

```bash
node index.js
```
This command will upload a sample JSON file to IPFS using the Spheron Storage SDK, fetch it, and display the uploaded data in the console.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Spheron for providing the Spheron Storage SDK.
Feel free to explore the code and customize it for your own use cases. If you have any questions or feedback, please don't hesitate to open an issue or reach out.

Happy coding!

