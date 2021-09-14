import React, { Component } from "react";
import { Alert } from "antd";

class About extends Component {

    componentDidMount() {
        document.title = "About Solace"
    }
    render() {
        return (
            <div className="homepage mb-4">
                <Alert
                message="COVID-19"
                description="The virus that causes COVID-19 is mainly transmitted through droplets generated when an infected person coughs, sneezes, or exhales. These droplets are too heavy to hang in the air, and quickly fall on floors or surfaces.
                You can be infected by breathing in the virus if you are within close proximity of someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth."
                type="info"
                showIcon
                />
                <div id="postblog" className="jumbotron jumbotron-fluid mt-3">
                    <div className="container py-1">
                        <h1 className="display-4">About Solace 😇</h1>
                        <p className="lead">
                            During Covid, patients have to be in isolation and have social anxiety and distress. In that time of need, it is necessary that you maintain connection and feel at ease. This website is a place where users who are suffering/ suffered or just curious about covid can get in and publish anonymized blogs about how they are feeling and their day as a covid patient. This is a platform where people can find solace and mental peace. This platform also allows users to listen to and stream songs. Solace is a platform where covid patients can overcome social anxiety and isolation that happens during covid, people can connect chat, and vibe to songs together.
                        </p>
                    </div>
                    </div>
                </div>
        )
    }
}

export default About;