export function useGetIcons() {
  const getIcons = (item) => {
    let icon = "";

    switch (item) {
      case "clear-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/113.png";
        break;
      case "clear-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/113.png";
        break;
      case "partly-cloudy-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/116.png";
        break;
      case "partly-cloudy-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/116.png";
        break;
      case "cloudy":
        icon = "//cdn.weatherapi.com/weather/64x64/day/119.png";
        break;
      case "fog":
        icon = "//cdn.weatherapi.com/weather/64x64/day/248.png";
        break;
      case "hail":
        icon = "/Images/hail.png";
        break;
      case "rain-snow-showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/182.png";
        ble;
        break;
      case "rain-snow-showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/182.png";
      case "rain-snow":
        icon = "//cdn.weatherapi.com/weather/64x64/day/320.png";
      case "rain":
        icon = "//cdn.weatherapi.com/weather/64x64/day/296.png";
        break;
      case "showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/353.png";
        break;
      case "showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/353.png";
        r;
        break;
      case "sleet":
        icon = "//cdn.weatherapi.com/weather/64x64/day/317.png";
        break;
      case "snow-showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/368.png";
        break;
      case "snow-showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/368.png";
        break;
      case "snow":
        icon = "//cdn.weatherapi.com/weather/64x64/day/326.png";
        break;
      case "thunder-rain":
        icon = "//cdn.weatherapi.com/weather/64x64/day/389.png";
        break;
      case "thunder-showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/386.png";
        break;
      case "thunder-showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/386.png";
        break;
      case "thunder":
        icon = "//cdn.weatherapi.com/weather/64x64/day/200.png";
        break;
      case "wind":
        icon = "/Images/wind.png";
        break;
      default:
        icon = "//cdn.weatherapi.com/weather/64x64/day/119.png";
    }
    return icon;
  };
  return { getIcons };
}
