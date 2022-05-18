//horoscope app using a horoscope API and mercury retrograde API
//display dropdown menu to choose your astrological sign
//daily horoscope populates according to your sign
//mercury retrograde also populates with tips for true or false
//image populates for each sign after clicking button 

import React, { Component } from 'react';
import axios from 'axios';
//import aquarius from './images/aquarius.png'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            json: [],
            mercury: '',
            sign: '',
            output: '',
            retrograde: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.request = this.request.bind(this)
    }


    
    

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        
        console.log(this.state.sign, event.target.value)
    }

    handleClick(event) {
        var that = this;
        axios
            
            .get(`https://ohmanda.com/api/horoscope/${this.state.sign}/`)
            
            .then(response => response.data)

            .then(json => that.setState({output: json.horoscope}));

        // JSON.parse(JSON.stringify(this.state.json));
        // this.setState({output: this.state.json.horoscope})
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        console.log("today", today);

        axios
            
            .get(`https://mercuryretrogradeapi.com?date=${today}`)
            
            .then(response => {
                console.log(response.data.is_retrograde); 
                let boolean = response.data.is_retrograde == true ? "true" : "false";
                that.setState({mercury: boolean})
            })




            
    }


    render() {
        return (
        

        <div>
        <div className='row justify-content-md-center'>
        <div className= "col-sm-5">
        <label className="form-label" id="rec">Choose Your Zodiac Sign</label>
                <select className="form-select" name="sign" onChange={this.handleChange} value={this.state.sign}>
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
                <button className="btn btn-success w-100" type="button" name="button" onClick={this.handleClick}>Get Horoscope</button>
                </div>
                </div>
                {/* <img src={aquarius} alt="product" onClick={this.handleClick} /> */}
                <div id="output" name="output" onClick={this.handleClick}>{this.state.output}</div>
                <div id="mercury" name="mercury" onClick={this.handleClick}>{this.state.mercury == "" ? <span></span> : this.state.mercury == "true" ? <p>Mercury is in retrograde</p> : <p>Mercury is not in retrograde</p>}</div>
        </div>
        );
    }
}

export default App;