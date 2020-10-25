import React, {useState} from 'react';
import './styles/main.scss';
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    CustomInput,
    InputGroup,
    InputGroupAddon, InputGroupText, Input, CardFooter,
    Button
} from "reactstrap"

enum CalculateMode {
    MONTHLY = "MONTHLY",
    TOTAL = "TOTAL"
}

const App = () => {
   const [amount, setAmount] = useState('');
   const [totalAmount, setTotalAmount] = useState('');
   const [monthlyAmount, setMonthlyAmount] = useState('');
   const [calculateMode, setCalculateMode] = useState<CalculateMode>(CalculateMode.MONTHLY);
   const [date, setDate] = useState('');

   const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const { value } = event.target;
       const numValue = Number(value.replace(/,/g, ''));
       if(!isNaN(numValue)){
           const newValue = numValue.toLocaleString();
           setAmount(newValue);
           calculateMode === CalculateMode.TOTAL ? setTotalAmount(newValue) : setMonthlyAmount(newValue);
       }
   }

   const handleCalculateModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event.target.checked){
          setCalculateMode(CalculateMode.TOTAL)
          setTotalAmount(amount);
          return;
      }

      setCalculateMode(CalculateMode.MONTHLY)
      setMonthlyAmount(amount);
   };




  return (
    <div className="app">
        <div className="page">
            <div className="page__header">
                <div className="header-title">
                    Let's plan your settings
                </div>
            </div>
            <div className="page__body">
                <Card className="calculator-card">
                    <CardBody>
                        <CardTitle className="calculator-card__title">
                            Savings calculator
                        </CardTitle>

                        <Form className="calculator-card__form">
                            <FormGroup className="d-flex align-items-center">
                                <CustomInput type="switch"
                                             id="calculateBy"
                                             name="customSwitch"
                                             inline={true}
                                             className="mr-0"
                                             checked={calculateMode === CalculateMode.TOTAL}
                                             onChange={handleCalculateModeChange}
                                />
                                <Label for="calculateBy" className="form__label--inline">
                                    {calculateMode === CalculateMode.TOTAL ? "Calculate by total amount" : "Calculate by monthly saving"}
                                </Label>
                            </FormGroup>

                            <FormGroup>
                                <Label for="amount" className="form__label--inline">
                                    {calculateMode === CalculateMode.TOTAL ? "Total amount" : "Monthly amount" }
                                </Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend" className="form__add-on">
                                        <InputGroupText>$</InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="form__input border-left-none"
                                        id="amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="amount" className="form__label--inline">
                                    {calculateMode === CalculateMode.TOTAL ? "Reach goal by" : "Save until" }
                                </Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend" className="form__add-on pointer">
                                        <InputGroupText>{"<"}</InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="form__input border-left-none border-right-none background-white"
                                           id="amount"
                                           value={date}
                                           disabled
                                    />
                                    <InputGroupAddon addonType="append" className="form__add-on pointer">
                                        <InputGroupText>{">"}</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Card className="info-panel">
                                    <CardBody className="info-panel__main">
                                        <div>
                                            {calculateMode === CalculateMode.TOTAL ? "Monthly amount" : "Total amount" }
                                        </div>
                                        <div className="info-panel__price">
                                            ${(calculateMode === CalculateMode.TOTAL ? totalAmount : monthlyAmount) || 0 }
                                        </div>
                                    </CardBody>
                                    <CardFooter className="info-panel__footer">
                                        { calculateMode === CalculateMode.TOTAL ?
                                            (
                                                <p>You are planning <span className="bold">{26} monthly</span> deposits to reach your <span className="bold">${totalAmount || 0 }</span> goal by <span className='bold'>{"April 2022."}</span></p>
                                            )
                                                :
                                            (
                                                <p>You are saving <span className="bold">${monthlyAmount || 0 } monthly</span> to save <span className="bold">${totalAmount || 0 }</span> by <span className="bold">{"April 2022."}</span></p>
                                            )
                                        }
                                    </CardFooter>
                                </Card>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" className="form__submit-button" block>
                                    Finish
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
  );
}

export default App;
