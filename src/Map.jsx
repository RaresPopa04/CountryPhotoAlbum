import React, { useEffect, useRef, useState } from "react";
import "./map.css";
import { useNavigate } from "react-router-dom";
import World from "./world";

import Popup from "./Popup";
const Map = () => {
	const navigate = useNavigate();

	const [showPopup, setShowPopup] = useState(false);
	const [country, setCountry] = useState("");

	const closePopup = () => {
		setShowPopup(false);
	}
	

    const setMousePosition = (e) => {
		console.log(e);
        if(!e) return;
        const x = e.clientX;
        const y = e.clientY;
        const popup = document.querySelector(".popup-box");
        if(!popup) return;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
		popup.style.visibility = "visible";

		console.log(x, y);
    }



	useEffect(() => {
		


		const countries = [
			"Albania",
			"Algeria",
			"American Samoa",
			"Andorra",
			"Angola",
			"Afghanistan",
			"Anguilla",
			"Antarctica",
			"Antigua and Barbuda",
			"Argentina",
			"Australia",
			"Austria",
			"Sudan",
			"Azerbaijan",
			"Bahamas",
			"Armenia",
			"Bahrain",
			"Bangladesh",
			"Barbados",
			"Belarus",
			"Belgium",
			"Belize",
			"Benin",
			"Bhutan",
			"Bolivia",
			"Bosnia and Herzegovina",
			"Botswana",
			"Brazil",
			"British Virgin Islands",
			"Brunei Darussalam",
			"Bulgaria",
			"Burkina Faso",
			"Burundi",
			"Cambodia",
			"Cameroon",
			"Canada",
			"Cape Verde",
			"Central African Republic",
			"Chad",
			"Chile",
			"China Mainland",
			"China",
			"Christmas Island",
			"Cocos Islands",
			"Colombia",
			"Comoros",
			"Congo-Brazzaville",
			"Congo-Kinshasa",
			"Cook Islands",
			"Costa Rica",
			"Cote d’Ivoire",
			"Croatia",
			"Cuba",
			"Cyprus",
			"Cyprus",
			"Czech Republic",
			"Denmark",
			"Djibouti",
			"Dominica",
			"Dominican Republic",
			"Ecuador",
			"Egypt",
			"El Salvador",
			"Equatorial Guinea",
			"Eritrea",
			"Estonia",
			"Ethiopia",
			"Falkland Islands",
			"Federated States of Micronesia",
			"Fiji",
			"Finland",
			"France",
			"French Guiana",
			"French Polynesia",
			"Gabon",
			"Gambia",
			"Georgia",
			"Germany",
			"Ghana",
			"Greece",
			"Greenland",
			"Grenada",
			"Guadeloupe",
			"Guam",
			"Guatemala",
			"Guinea",
			"Guinea Bissau",
			"Guyana",
			"Haiti",
			"Honduras",
			"Hungary",
			"Iceland",
			"India",
			"Indonesia",
			"Iran",
			"Iraq",
			"Ireland",
			"Israel",
			"Italy",
			"Jamaica",
			"Japan",
			"Jordan",
			"Kazakhstan",
			"Kenya",
			"Kiribati",
			"Kosovo",
			"Kuwait",
			"Kyrgyzstan",
			"Laos",
			"Latvia",
			"Lebanon",
			"Lesotho",
			"Liberia",
			"Libya",
			"Liechtenstein",
			"Lithuania",
			"Luxembourg",
			"Macedonia",
			"Madagascar",
			"Malawi",
			"Malaysia",
			"Maldives",
			"Mali",
			"Malta",
			"Martinique",
			"Mauritania",
			"Mauritius",
			"Mexico",
			"Micronesia",
			"Moldova",
			"Monaco",
			"Mongolia",
			"Montenegro",
			"Morocco",
			"Mozambique",
			"Myanmar",
			"Namibia",
			"Nauru",
			"Nepal",
			"Netherlands",
			"New Caledonia",
			"New Zealand",
			"Nicaragua",
			"Niger",
			"Nigeria",
			"Niue",
			"Norfolk Island",
			"North Korea",
			"Norway",
			"Oman",
			"Pakistan",
			"Palau",
			"Palestine",
			"Panama",
			"Papua New Guinea",
			"Paraguay",
			"Peru",
			"Philippines",
			"Poland",
			"Portugal",
			"Qatar",
			"Republic of the Sudan",
			"Romania",
			"Russia",
			"Russian Federation",
			"Rwanda",
			"Saint Kitts and Nevis",
			"Saint Lucia",
			"Samoa",
			"San Marino",
			"São Tomé and Príncipe",
			"Saudi Arabia",
			"Senegal",
			"Serbia",
			"Seychelles",
			"Sierra Leone",
			"Singapore",
			"Slovakia",
			"Slovenia",
			"Solomon Islands",
			"Somalia",
			"South Africa",
			"South Georgia and the South Sandwich Islands",
			"South Korea",
			"South Sudan",
			"Spain",
			"Sri Lanka",
			"Suriname",
			"Svalbard and Jan Mayen",
			"Swaziland",
			"Sweden",
			"Switzerland",
			"Syria",
			"Taiwan",
			"Tajikistan",
			"Tanzania",
			"Thailand",
			"Togo",
			"Tonga",
			"Trinidad and Tobago",
			"Tunisia",
			"Turkey",
			"Turkmenistan",
			"Tuvalu",
			"Uganda",
			"Ukraine",
			"United States",
			"United Arab Emirates",
			"United Kingdom",
			"Uruguay",
			"Uzbekistan",
			"Vanuatu",
			"Vatican City",
			"Venezuela",
			"Vietnam",
			"Wallis and Futuna Islands",
			"Western Sahara",
			"Yemen",
			"Zambia",
			"Zimbabwe"
		];
		countries.forEach((country) => {
			var countryElements = document.getElementsByClassName(`${country}`);
			if(countryElements.length === 0) {
				countryElements = document.getElementsByName(`${country}`);
			}
			Array.from(countryElements).forEach((element) => {
				element.addEventListener('click', (e) => {
					setShowPopup(true);
					setCountry(country);

					setTimeout(()=>{
						setMousePosition(e);
					},20);
				});
			});
			
		});
	}
	, []);

	
    return (
        <>
			{showPopup && <Popup country={country} closePopup = {closePopup}/>}
			<World/>
		</>
    )};
export default Map;