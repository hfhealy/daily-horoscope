//horoscope web application using a horoscope API and mercury retrograde API
//display dropdown menu to choose your astrological sign
//daily horoscope populates according to your sign
//meme image populates for each sign after clicking button 
//mercury retrograde for current date populates

import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        //sets default state
        this.state = {
            json: [],
            mercury: '',
            sign: '',
            output: '',
            retrograde: '',
            image: '', 
            year: '',
            month: '',
            day: ''
        }
        //binds functions
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    //handleChange function sets state according to dropdown selection of zodiac sign
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    //handleClick function runs after 'get horoscope' button is clicked
    handleClick(event) {
            
        //Grab API data for sign selected from dropdown menu and set state to json variable
            const URL = `https://aztro.sameerkumar.website/?sign=${this.state.sign}&day=today`;
            fetch(URL, {
                method: 'POST'
            }).then(response => response.json())
            .then(json => { this.setState({json}); });
        
        //create new date for current day
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
        //format today variable with year first to get mercury retrograde API data for current date
            today = yyyy + '-' + mm + '-' + dd;
        //set state for year, month and day 
            this.setState({year: yyyy, month: mm, day:dd})
        
        //fetch mercury retrograde API data for today's date
        //set boolean variable to true or false depending on API response data for current date
        //set state for mercury to boolean variable
        axios
            .get(`https://mercuryretrogradeapi.com?date=${today}`)

            .then(response => {
                let boolean = response.data.is_retrograde == true ? "true" : "false";
                this.setState({mercury: boolean})
            })

            this.setState({image: this.state.sign});      
    }

    render() {
        return (
    <div>
        <img src="https://horoscope-react.s3.us-west-1.amazonaws.com/Daily+(1).png" id="headerimg" className="img-fluid w-75"/>
        <div className="row mx-auto d-block w-75">
            <div className= "col">
                <p className="form-label text-center" id="rec">Choose Your Zodiac Sign...</p>
                <select className="form-select" name="sign" onChange={this.handleChange} value={this.state.sign}>
                    <option>Select Your Sign</option>
                    <option name="aquarius" value="aquarius">Aquarius</option>
                    <option name="pisces" value="pisces">Pisces</option>
                    <option name="aries" value="aries">Aries</option>
                    <option name="taurus" value="taurus">Taurus</option>
                    <option name="gemini" value="gemini">Gemini</option>
                    <option name="cancer" value="cancer">Cancer</option>
                    <option name="leo" value="leo">Leo</option>
                    <option name="virgo" value="virgo">Virgo</option>
                    <option name="libra" value="libra">Libra</option>
                    <option name="scorpio" value="scorpio">Scorpio</option>
                    <option name="sagittarius" value="sagittarius">Sagittarius</option>
                    <option name="capricorn" value="capricorn">Capricorn</option>
                </select>
                <button className="w-100" type="button" name="button" onClick={this.handleClick}>Get Horoscope</button>
            </div>
        </div>
        <div id="content">
            <div className="row row-cols-1 g-2 g-lg-3">
                <div className="col" id="image-col">
                {this.state.image == "" ? <span></span> : <img src={`https://horoscope-react.s3.us-west-1.amazonaws.com/${this.state.image}.jpeg`} onClick={this.handleClick} name="image" className='img-fluid w-50 mx-auto d-block'/>}
                </div>
                <div className="col" id="output-col">
                <h2 className="text-center" onClick={this.handleClick}>{this.state.image.toUpperCase()}</h2>
                {this.state.image == "" ? <span></span> : <div className="text-center" id="date" onClick={this.handleClick}>{`${this.state.month}-${this.state.day}-${this.state.year}`}</div>}
                <div id="output" name="output" className="text-center" onClick={this.handleClick}>{this.state.json.description}
                </div>
                </div>
            </div>
                <div id="mercury" name="mercury" onClick={this.handleClick}>{this.state.mercury == "" ? <span></span> 
                : this.state.mercury == "true" ? 
                <div>
                <h3 className="text-center">Is Mercury in Retrograde Today?</h3>
                <p className="text-center">Yes, mercury is in retrograde today! Don’t make any important moves when Mercury is retrograde. Nothing will be settled successfully for the future during these periods anyway – you will find it nearly impossible to nail down a plan. During a retrograde period, it is hard to get decisions from others. Even if a decision is made, it will be subject to change, either just after Mercury turns to direct motion or much later.</p>
                </div>
                : <div>
                <h3 className="text-center">Is Mercury in Retrograde Today?</h3>
                <p className="text-center">No, mercury is not in retrograde today! Resume life as normal.</p>
                </div>
                }
            </div>
        </div>
    </div>
        );
    }
}

export default App;