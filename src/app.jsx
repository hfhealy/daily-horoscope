//horoscope app using a horoscope API and mercury retrograde API
//display dropdown menu to choose your astrological sign
//daily horoscope populates according to your sign
//mercury retrograde also populates with tips for true or false
//image populates for each sign after clicking button 

import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            json: [],
            mercury: '',
            sign: '',
            output: '',
            retrograde: '',
            image: ''
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

            this.setState({image: this.state.sign});


            
    }


    render() {
        return (
        

        <div>
        <img src="https://horoscope-react.s3.us-west-1.amazonaws.com/Daily+(1).png" id="headerimg" />
        <div className='row justify-content-md-center'>
        <div className= "col-sm-5">
        
        {/* <h1 className='text-center'>Daily Horoscope</h1> */}
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
                {/* <img src={require('./images/aquarius.png')} onClick={this.handleClick} /> */}
                {this.state.image == "" ? <span></span> : <img src={`https://horoscope-react.s3.us-west-1.amazonaws.com/${this.state.image}.jpeg`} onClick={this.handleClick} name="image" className='float-start'/>}
                <h2 onClick={this.handleClick}>{this.state.image.toUpperCase()}</h2>
                <div id="output" name="output" onClick={this.handleClick}>{this.state.output}</div>
                <div id="mercury" name="mercury" onClick={this.handleClick}>{this.state.mercury == "" ? <span></span> 
                : this.state.mercury == "true" ? 
                <div>
                <h3>Is Mercury in Retrograde Today?</h3>
                <p>Yes, mercury is in retrograde today! Don’t make any important moves when Mercury is retrograde. Nothing will be settled successfully for the future during these periods anyway – you will find it nearly impossible to nail down a plan. During a retrograde period, it is hard to get decisions from others. Even if a decision is made, it will be subject to change, either just after Mercury turns to direct motion or much later.</p>
                </div>
                : <div>
                <h3>Is Mercury in Retrograde Today?</h3>
                <p>No, mercury is not in retrograde today! Resume life as normal.</p>
                </div>
                }
                </div>
                </div>
        </div>
        );
    }
}

export default App;