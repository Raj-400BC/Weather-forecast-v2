# Weather App

This is a simple web application that allows users to retrieve weather information based on their geolocation. The backend is built with Node.js using Express, and the frontend uses vanilla JavaScript.

## Features

- Fetches weather data based on latitude and longitude.
- Displays information such as temperature, wind speed, weather condition, and description.
- Data storage using Nedb.
- Responsive and simple user interface.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [npm](https://www.npmjs.com/) (Node.js package manager) installed.
- OpenWeatherMap API key (sign up [here](https://openweathermap.org/api) to get one).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Weather-forecast-v2.git
    cd Weather-App
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your OpenWeatherMap API key:

   Create a file named `.env` in the root directory.

   Add your API key:

    ```env
    API_KEY=your-api-key-here
    ```

### Usage

1. Run the server:

    ```bash
    npm start
    ```

2. The server will be running at [http://localhost:3001](http://localhost:3001).

3. Open your web browser and navigate to [http://localhost:3001](http://localhost:3001).

4. Click the "Submit" button to retrieve weather information based on your current geolocation.

## Development

- The server is built with Node.js, Express, and NeDB (a lightweight embedded database).
- The client-side code uses JavaScript to fetch and display weather data.

## Known Issues

[List any known issues or limitations here]

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to OpenWeatherMap for providing the weather data API.

Feel free to contribute, report issues, or provide feedback!
