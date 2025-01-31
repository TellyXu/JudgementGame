import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";
import ScrollTransparentNavbar from "../components/Navbars/ScrollTransparentNavbar";
import FooterBlack from "../components/Footers/FooterBlack";



import svg1 from '../assets/svg/openai.svg';
import svg2 from '../assets/svg/fmp-brain-original.svg';
import svg3 from '../assets/svg/company.svg';
import svg4 from '../assets/svg/document.svg';
import svg5 from '../assets/svg/date-year.svg';




function ContactUs() {


    const [openaikeyFocus, setopenaikeyFocus] = React.useState(false);
    const [fmpkeyFocus, setfmpkeyFocus] = React.useState(false);
    const [tickerFocus, settickerFocus] = React.useState(false);
    const [typedocFocus, settypedocFocus] = React.useState(false);
    const [yearFocus, setyearFocus] = React.useState(false);

    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [openaiKey, setOpenAIKey] = useState('');
    const [fmpKey, setFmpKey] = useState('');
    const [ticker, setTicker] = useState('');
    const [typedoc, setTypeDoc] = useState('');
    const [year, setYear] = useState('');
    const [query, setQuery] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [error, setError] = useState('');
    const [realTimeMessages, setRealTimeMessages] = useState([]);


    useEffect(() => {
        document.title = ' RAG - OPENAI | CDHAI';
        const ws = new WebSocket('ws://localhost:8000/ws'); // Ensure this is the correct URL for your WebSocket connection
        ws.onopen = () => console.log('WebSocket Connected');
        ws.onmessage = (event) => {
            console.log('Message from WebSocket:', event.data);
            setRealTimeMessages((prevMessages) => [...prevMessages, event.data]);
        };
        ws.onerror = (error) => console.log('WebSocket Error:', error);
        ws.onclose = () => console.log('WebSocket Disconnected');

        return () => {
            ws.close();
        };
    }, [ticker]);

    const handleCheckboxChange = () => {
        const newChecked = !checkboxChecked;
        setCheckboxChecked(newChecked);
        if (newChecked) {
            setOpenAIKey('sk-proj-wrDJH5mtGFAVgJ6UIalNT3BlbkFJ7qj4ivUPb2XNa9YGb0bp');
            setFmpKey('KlrimT7FwkkBiLxYyQ9rvjV0bvY8Tj4w');
            setTicker('AAPL');
            setTypeDoc('10-k');
            setYear('2023');
            setQuery('Who are the key leadership at Apple? Use the context to answer this question.');
        } else {
            setOpenAIKey('');
            setFmpKey('');
            setTicker('');
            setTypeDoc('');
            setYear('');
            setQuery('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await fetch('http://localhost:8000/process-filings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    openai_key: openaiKey,
                    fmp_key: fmpKey,
                    ticker: ticker,
                    typedoc: typedoc,
                    year: year,
                    query: query,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApiResponse(data.message); // Update state with the response message
        } catch (e) {
            setError(`There was a problem with your fetch operation: ${e.message}`);
        }
    };


    return (
        <>
            <ScrollTransparentNavbar />

            <div style={{
                display: 'flex', // 使用flex布局
                flexDirection: 'column', // 子元素垂直排列
                justifyContent: 'center', // 垂直居中

                height: '100vh', // 减去页脚的高度

            }}>
                <div
                    className="contactus-1 section-image"
                    style={{
                        backgroundImage: "url(" + require("assets/img/HBC_JHU5704_c_3000x2000.jpg") + ")",
                        backgroundSize: 'cover', // 确保背景图片覆盖整个容器
                        backgroundRepeat: 'no-repeat', // 背景图片不重复
                        backgroundPosition: 'center center', // 背景图片居中显示
                        width: '100%', // 宽度设置为100%
                        height: 'calc(100vh)', // 减去页脚的高度
                    }}
                >
                    <Container>
                        <Row>

                            <Col className="ml-auto mr-auto" md="5">
                                <Card className="card-contact card-raised">
                                    <Form id="contact-form1" method="post" role="form" onSubmit={handleSubmit}>
{/*                                        <CardHeader className="text-center">
                                            <CardTitle tag="h4">Contact Us</CardTitle>
                                        </CardHeader>*/}
                                        <CardBody>
                                            <Row>
                                                <Col className="pr-2" md="6">
                                                    <label>OpenAI API Key</label>
                                                    <InputGroup
                                                        className={openaikeyFocus ? "input-group-focus" : ""}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <img src={svg1} alt="OpenAI Logo" width="17"
                                                                     height="17"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            value={openaiKey}
                                                            onChange={(e) => setOpenAIKey(e.target.value)}
                                                            aria-label="OpenAI API Key"
                                                            autoComplete='sk-proj-wrDJH5mtGFAVgJ6UIalNT3BlbkFJ7qj4ivUPb2XNa9YGb0bp'
                                                            placeholder="OpenAI API Key"
                                                            type="text"
                                                            onFocus={() => setopenaikeyFocus(true)}
                                                            onBlur={() => setopenaikeyFocus(false)}
                                                        ></Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col className="pl-2" md="6">
                                                    <FormGroup>
                                                        <label>FMP API Key</label>
                                                        <InputGroup
                                                            className={fmpkeyFocus ? "input-group-focus" : ""}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <img src={svg2} alt="FMP Brain" width="17"
                                                                         height="17"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                value={fmpKey}
                                                                onChange={(e) => setFmpKey(e.target.value)}
                                                                aria-label="FMP API Key"
                                                                autoComplete='KlrimT7FwkkBiLxYyQ9rvjV0bvY8Tj4w'
                                                                placeholder="FMP API Key"
                                                                type="text"
                                                                onFocus={() => setfmpkeyFocus(true)}
                                                                onBlur={() => setfmpkeyFocus(false)}
                                                            ></Input>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col className="pr-2" md="4">
                                                    <label>ticker</label>
                                                    <InputGroup
                                                        className={tickerFocus ? "input-group-focus" : ""}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <img src={svg3} alt="Company" width="17" height="17"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            value={ticker}
                                                            onChange={(e) => setTicker(e.target.value)}
                                                            aria-label="ticker"
                                                            autoComplete='AAPL'
                                                            placeholder="ticker"
                                                            type="text"
                                                            onFocus={() => settickerFocus(true)}
                                                            onBlur={() => settickerFocus(false)}
                                                        ></Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col className="pl-2" md="4">
                                                    <FormGroup>
                                                        <label>Type Doc</label>
                                                        <InputGroup
                                                            className={typedocFocus ? "input-group-focus" : ""}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <img src={svg4} alt="Document" width="17"
                                                                         height="17"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                value={typedoc}
                                                                onChange={(e) => setTypeDoc(e.target.value)}
                                                                aria-label="TypeDoc"
                                                                autoComplete='10-k'
                                                                placeholder="Type Doc"
                                                                type="text"
                                                                onFocus={() => settypedocFocus(true)}
                                                                onBlur={() => settypedocFocus(false)}
                                                            ></Input>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pl-2" md="4">
                                                    <FormGroup>
                                                        <label>Year</label>
                                                        <InputGroup
                                                            className={yearFocus ? "input-group-focus" : ""}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <img src={svg5} alt="Date Year" width="17"
                                                                         height="17"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                value={year}
                                                                onChange={(e) => setYear(e.target.value)}
                                                                aria-label="year"
                                                                autoComplete='2023'
                                                                placeholder="year"
                                                                type="text"
                                                                onFocus={() => setyearFocus(true)}
                                                                onBlur={() => setyearFocus(false)}
                                                            ></Input>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <FormGroup>
                                                <label>Query</label>
                                                <Input
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    id="message"
                                                    name="message"
                                                    rows="6"
                                                    type="textarea"
                                                ></Input>
                                            </FormGroup>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" checked={checkboxChecked}
                                                                   onChange={handleCheckboxChange}/>
                                                            <span className="form-check-sign"></span>
                                                            {checkboxChecked ? 'Clear' : 'Default'}
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <Button
                                                        className="btn-round pull-right"
                                                        color="info"
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Form>
                                </Card>
                            </Col>
                            <Col md="5">
                                <h2 className="title">Message From GPT</h2>
                                <h2 className="title">
                                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                                </h2>
                                <div style={{color: "rgba(255, 255, 255,1)"}}>
                                    {apiResponse && <pre style={{
                                        color: "rgba(255, 255, 255,1)",
                                        whiteSpace: "pre-wrap"
                                    }}>{apiResponse}</pre>}
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>
                <FooterBlack style={{
                    width: '100%', // 宽度设置为100%
                    boxSizing: 'border-box',
                    margin: '0', // Resets any margin that might be present
                    padding: '0', // Resets any padding that might be present
                }}/>
            </div>



            </>
            );
            }

export default ContactUs;
