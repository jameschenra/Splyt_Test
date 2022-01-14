import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setTaxiCount, setOffice, selectOfficeCity, selectTaxiCount } from "../reducers/filters";
import { Range } from "react-range";
import { useState } from "react";
import { useAppSelector } from "../store/configureStore";

const Controls = () => {
  const dispatch = useDispatch();
  const officeCity: string = useAppSelector(selectOfficeCity);
  const taxiCount: number = useAppSelector(selectTaxiCount);
  const [countValue, setCountValue] = useState(taxiCount);

  const onChangeOffice = (e: any) => {
    const newCity: string = e.target.value;
    dispatch(setOffice(newCity));
  };

  const onChangeTaxiCount = (values: number[]) => {
    setCountValue(values[0]);
  };

  const onChangedTaxiCount = () => {
    dispatch(setTaxiCount(countValue));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Select Office : </Form.Label>
            <Form.Control
              role="office-filter"
              as="select"
              value={officeCity}
              onChange={onChangeOffice}
            >
              <option value="LONDON">London</option>
              <option value="SINGAPORE">Singapore</option>
            </Form.Control>
          </Form.Group>
        </Col>
        
        <Col>
          <Form.Group>
            <Form.Label>Select Driver Count : </Form.Label>
            <div className="mt-3">
              <Range
                step={1}
                min={1}
                max={10}
                values={[countValue]}
                onChange={(values) => onChangeTaxiCount(values)}
                onFinalChange={onChangedTaxiCount}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      display: "flex",
                      height: "40px",
                      width: "40px",
                      backgroundColor: "#999",
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "100%"
                    }}
                  >{countValue}</div>
                )}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default Controls;
