import React, { useState } from "react";
// javascript library that creates a parrallax effect
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import PiA from "../components/Pia"
import Box from "../components/Box"
import { Button } from "reactstrap";
import FooterBlack from "../components/Footers/FooterBlack";
import { Card, Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom';
function Dashboard({ show }) {
    const navigate = useNavigate();

    const [p0, setP0] = useState([]);
    const [p1, setP1] = useState([]);
    const [p2, setP2] = useState([]);
    const [p3, setP3] = useState([]);
    const [p4, setP4] = useState([]);
    // !~ survey2 data
    const [survey2Data, setSurvey2Data] = useState([]);
    //~!

    // !~ survey3 data
    const [survey3Data, setSurvey3Data] = useState([]);
    // ~!

    // !~ survey4 data
    const [survey4Data, setSurvey4Data] = useState([]);
    // ~!

    // !~ survey5 data
    const [survey5Data, setSurvey5Data] = useState([]);
    // ~!

    // !~ survey6 data
    const [survey6Data, setSurvey6Data] = useState([]);
    // ~!

    // !~ poll1 data
    const [survey7Data, setSurvey7Data] = useState([]);
    // ~!

    // !~ poll2 data
    const [survey8Data, setSurvey8Data] = useState([]);
    // ~!

    // !~ poll3 data
    const [survey9Data, setSurvey9Data] = useState([]);
    // ~!

    const getaData = () => {
        fetch("http://localhost:8000/find", { method: 'POST' })
            .then((response) => response.json())
            .then(({ data, code }) => {
                console.log('data' + code, data)
                if (code === 200) {
                    setP0(data.filter(item => item.survey_num === 1 && item.version === 1))
                    setP1(data.filter(item => item.survey_num === 1 && item.version === 2))
                    setP2(data.filter(item => item.survey_num === 1 && item.version === 1))
                    setP3(data.filter(item => item.survey_num === 1 && item.version === 2))
                    setP4(data.filter(item => item.survey_num === 1))
                    // !~ survey2 data
                    setSurvey2Data(data.filter(item => item.survey_num === 2))
                    //~!

                    // !~ survey3 data
                    setSurvey3Data(data.filter(item => item.survey_num === 3))
                    //~!

                    // !~ survey4 data
                    setSurvey4Data(data.filter(item => item.survey_num === 4))
                    //~!

                    // !~ survey5 data
                    setSurvey5Data(data.filter(item => item.survey_num === 5))
                    //~!

                    // !~ survey6 data
                    setSurvey6Data(data.filter(item => item.survey_num === 6))
                    //~!

                    // !~ poll1 data
                    setSurvey7Data(data.filter(item => item.survey_num === 7))
                    //~!

                    // !~ poll2 data
                    setSurvey8Data(data.filter(item => item.survey_num === 8))
                    //~!

                    // !~ poll3 data
                    setSurvey9Data(data.filter(item => item.survey_num === 9))
                    //~!

                    // alert('Refresh success')
                    return
                }
                alert('Data loading error')

            });
    }


    const repeatCount = (val, targets) => {
        let count = 1
        targets.map(item => item.text_val)
        for (let index = 0; index < targets.length; index++) {
            if (targets[index].text_val === val) count++
        }
        return count
    }


    React.useEffect(() => {
        getaData()
    }, [])

    return (
        <>
            <ScrollTransparentNavbar />
            <div style={{ minHeight: '100vh' }}>

                <div className="contactus-1 section-image"
                    style={{

                        display: 'flex', // 使用flex布局
                        flexDirection: 'column', // 子元素垂直排列
                        justifyContent: 'center', // 垂直居中
                        alignItems: 'center', // 水平居中
                        minHeight: '100vh',
                        backgroundImage: "url(" + require("assets/img/HBC_JHU5704_c_3000x2000.jpg") + ")",
                        backgroundSize: 'cover', // 确保背景图片覆盖整个容器
                        backgroundRepeat: 'no-repeat', // 背景图片不重复
                        backgroundPosition: 'center center', // 背景图片居中显示
                    }}>
                    <Container>

                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
                            <Button color="info" onClick={_ => getaData()}>Refresh Dashboard</Button>
                            {(show <=6) && <Button
                                color="info"
                                onClick={() => {
                                    if (show === 1 || show === 2) {
                                        navigate('/text12');
                                    } else if (show === 3 || show === 4) {
                                        navigate('/text34');
                                    } else if (show === 5) {
                                        navigate('/text5');
                                    } else if (show === 6) {
                                        navigate('/text6');
                                    }
                                }}
                                style={{ marginLeft: '20px' }}
                            >
                                {show === 1 || show === 2
                                    ? 'ANCHORING EFFECT BIAS'
                                    : show === 3 || show === 4
                                        ? 'FRAMING AND LOSS AVERSION'
                                        : show === 5
                                            ? 'MENTAL ACCOUNTING'
                                            : show === 6
                                                ? 'BASE RATE FALLACY'
                                                : 'DEFAULT TEXT'}
                            </Button>
                            }
                        </div>

                        {
                            show === 1 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Judgement 1</h2>
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <PiA filter={[1, 0]} pData={p0} keyName='Q1_Answer' tag={['Before', 'After']} />
                                    </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <PiA filter={[1, 0]} pData={p1} keyName='Q1_Answer' tag={['Before', 'After']} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <Box pData={p2} name='Group1_Q2_Answer' keyName='Q2_Answer' />
                                    </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <Box pData={p3} name='GROUP2_Q2_Answer' keyName='Q2_Answer' />
                                    </div>
                                    <div>
                                        <Box pData={p4} name='ALL_GROUP_Q2_Answer' keyName='Q2_Answer' />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            show === 2 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Judgement 2</h2>
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <Box pData={survey2Data.filter(item => item.version === 1)} name='survey2_Q1_Answer'
                                            keyName='Q1_Answer' />
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <Box pData={survey2Data.filter(item => item.version === 2)} name='survey2_Q2_Answer'
                                            keyName='Q1_Answer' />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            show === 3 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Judgement 3</h2>
                                {/*<div style={{color: 'white', textAlign: 'left', width: '700px', margin: '0 auto'}}>*/}
                                {/*    <p style={{marginBottom: '0'}}>*/}
                                {/*        Vaccine A: 400 (out of 600) people will die from this disease;*/}
                                {/*    </p>*/}
                                {/*    <p style={{marginBottom: '0'}}>*/}
                                {/*        Vaccine B: with 1/3 probability, nobody dies; with 2/3 probability all 600 will die.*/}
                                {/*    </p>*/}
                                {/*    <p style={{marginBottom: '0'}}>*/}
                                {/*        Vaccine C: it will save 200 (out of 600) people*/}
                                {/*    </p>*/}
                                {/*    <p style={{marginBottom: '0'}}>*/}
                                {/*        Vaccine D: with probability 1/3, all 600 will be saved, 2/3 of the probability nobody of the*/}
                                {/*        600 is saved.*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <PiA filter={[1, 2]} pData={survey3Data.filter(item => item.version === 1)}
                                            name='survey3_Q1_Answer' keyName='Q1_Answer' tag={['A', 'B']} />
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <PiA filter={[3, 4]} pData={survey3Data.filter(item => item.version === 2)}
                                            name='survey3_Q2_Answer' keyName='Q1_Answer' tag={['C', 'D']} />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            show === 4 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Judgement 4</h2>
                                <div style={{ color: 'white', textAlign: 'left', width: '700px', margin: '0 auto' }}>
                                </div>
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <PiA filter={[0, 1]} pData={survey4Data.filter(item => item.version === 1)}
                                            name='survey4_Q1_Answer' keyName='Q1_Answer' tag={['YES', 'NO']} />
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <PiA filter={[0, 1]} pData={survey4Data.filter(item => item.version === 2)}
                                            name='survey4_Q2_Answer' keyName='Q1_Answer' tag={['YES', 'NO']} />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            show === 5 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Judgement 5</h2>
                                <div style={{ color: 'white', textAlign: 'left', width: '700px', margin: '0 auto' }}>
                                </div>
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <PiA filter={[0, 1]} pData={survey5Data} name='survey2_Q1_Answer' keyName='Q1_Answer'
                                            tag={['golf', 'Soccer']} />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            show === 6 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Judgement 6</h2>
                                <div style={{ color: 'white', textAlign: 'left', width: '700px', margin: '0 auto' }}>
                                </div>
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div>
                                        <PiA isDiyData filter={[1, 2, 3, 4, 5, 6]}
                                            pData={survey6Data.filter(item => item.version === 1)} name='survey4_Q1_Answer'
                                            keyName='Q1_Answer' tag={['1', '2', '3', '4', '5', '6']} />
                                    </div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <PiA isDiyData filter={[1, 2, 3, 4, 5, 6]}
                                            pData={survey6Data.filter(item => item.version === 2)} name='survey4_Q2_Answer'
                                            keyName='Q1_Answer' tag={['1', '2', '3', '4', '5', '6']} />
                                    </div>
                                </div>


                            </div>
                        }

                        {
                            show === 7 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Poll 1</h2>
                                <div style={{ color: 'white', textAlign: 'left', width: '700px', margin: '0 auto' }}>
                                </div>
                                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center', color: 'white' }}>
                                    <div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h5 style={{ marginBottom: 0 }}>1-1</h5>
                                            <p style={{ marginBottom: 0 }}>Have you personally used an AI productivity tool?</p>
                                            <PiA filter={[0, 1]} pData={survey7Data.filter(item => item.version === 1)}
                                                name='survey4_Q1_Answer' keyName='Q1_Answer' tag={['YES', 'NO']} />
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '50px', textAlign: 'center' }}>
                                        <h5 style={{ marginBottom: 0 }}>1-2</h5>
                                        <p style={{ marginBottom: 0 }}>If yes, which one </p>
                                        <div style={{ height: '18.8rem', overflow: 'auto', color: "black", background: 'white', padding: '15px' }}>
                                            {
                                                [...new Set(survey7Data.map(item => item.text_val))].map(item => {
                                                    if (item) {
                                                        return <div key={item} style={{ display: 'flex', textAlign: 'center' }}>
                                                            <div style={{ display: 'flex' }}>
                                                                <p style={{ width: '200px' }}>{item}</p>
                                                                <p>repeat: {repeatCount(item, survey7Data)}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h5 style={{ marginBottom: 0 }}>1-3</h5>
                                            <p style={{ marginBottom: 0 }}>To what extent did you find the tool useful? </p>
                                            <p style={{ marginBottom: 0 }}>(5-point scale. Not at all useful – Very useful)</p>
                                            <div>
                                                <PiA isDiyData filter={[0, 1, 2, 3, 4, 5]}
                                                    pData={survey7Data.filter(item => item.version === 3)} name='poll 1-3'
                                                    keyName='Q1_Answer' tag={['0', '1', '2', '3', '4', '5']} />
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        }

                        {
                            show === 8 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Poll 2</h2>
                                <div style={{ color: 'white', textAlign: 'center' }}>
                                    <p style={{ marginBottom: 0 }}>Rate the risk of committing a crime</p>
                                    <p style={{ marginBottom: 0 }}>(not a misdemeanor) on a scale of 1-10; 1=lowest risk, 10=highest risk</p>
                                    <div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <h5 style={{ marginBottom: 0 }}>2-1</h5>
                                            <div>
                                                <PiA isDiyData filter={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                                    pData={survey8Data.filter(item => item.version === 1)} name='poll 2-1'
                                                    keyName='Q1_Answer' tag={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', marginLeft: '30px' }}>
                                            <h5 style={{ marginBottom: 0 }}>2-2</h5>
                                            <div>
                                                <PiA isDiyData filter={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                                    pData={survey8Data.filter(item => item.version === 2)} name='poll 2-2'
                                                    keyName='Q1_Answer' tag={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            show === 9 && <div>
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Poll 3</h2>
                                <div style={{ color: 'white', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <h5 style={{ marginBottom: 0 }}>2-1</h5>
                                            <p style={{ marginBottom: 0 }}>AI will change how you do your current job in the next five years</p>
                                            <div>
                                                <PiA isDiyData filter={[0, 1, 2]}
                                                    pData={survey9Data.filter(item => item.version === 1)} name='poll 3-1'
                                                    keyName='Q1_Answer' tag={['Not likely', 'Don’t know', 'Likely']} />
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', marginLeft: '30px' }}>
                                            <h5 style={{ marginBottom: 0 }}>2-2</h5>
                                            <p style={{ marginBottom: 0 }}>AI will replace your current job in the next five years</p>
                                            <div>
                                                <PiA isDiyData filter={[0, 1, 2]}
                                                    pData={survey9Data.filter(item => item.version === 2)} name='poll 3-2'
                                                    keyName='Q1_Answer' tag={['Not likely', 'Don’t know', 'Likely']} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </Container>

                </div>

            </div>
            <FooterBlack style={{
                position: 'relative',
                width: '100%', // 宽度设置为100%
                boxSizing: 'border-box',
                margin: '0', // Resets any margin that might be present
                padding: '0', // Resets any padding that might be present
            }} />
        </>

    )
        ;
}

export default Dashboard;
