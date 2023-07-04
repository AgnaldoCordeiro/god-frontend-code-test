import React, { useEffect, useRef, useState } from "react";
import { Flex, IconButton, Nav, NavItem, Spacer, Text, View } from "vcc-ui";
import CardCar from "../src/components/CardCar";
import { GetServerSideProps } from "next";

interface ICars {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

interface CarProps {
  data: ICars[];
}

export default function Home({ data }: CarProps) {
  const [carData, setCarData] = useState<ICars[]>([]);
  const [carDataSuv, setCarDataSuv] = useState<ICars[]>([]);
  const [carDataEstate, setCarDataEstate] = useState<ICars[]>([]);
  const [carDataSedan, setCarDataSedan] = useState<ICars[]>([]);

  const carousel = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(1);
  const [qtdTotal, setQtdTotal] = useState(0);
  const [qtdSuv, setQtdSuv] = useState(0);
  const [qtdEstate, setQtdEstate] = useState(0);
  const [qtdSedan, setQtdSedan] = useState(0);

  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
  };

  useEffect(() => {
    setCarData(data);
    const iQtdTotal = data.length;
    setQtdTotal(iQtdTotal);

    const carsSuv = data.filter((car: ICars) => car.bodyType === "suv");
    const carsSedan = data.filter((car: ICars) => car.bodyType === "sedan");
    const carsEstate = data.filter((car: ICars) => car.bodyType === "estate");

    const iQtdSuv = carsSuv.length;
    setCarDataSuv(carsSuv);
    setQtdSuv(iQtdSuv);

    const iQtdSedan = carsSedan.length;
    setCarDataSedan(carsSedan);
    setQtdSedan(iQtdSedan);

    const iQtdEstate = carsEstate.length;
    setCarDataEstate(carsEstate);
    setQtdEstate(iQtdEstate);
  }, [data]);

  if (!carData || !carData.length) return null;

  return (
    <View className="container">
      <Flex extend={{ alignItems: "center", padding: "2rem" }}>
        <Text variant={"cook"}>All models.</Text>
      </Flex>

      <Nav>
        <NavItem
          isActive={active === 1}
          onClick={() => {
            setActive(1);
          }}
        >
          All ({qtdTotal})
        </NavItem>
        <NavItem
          isActive={active === 2}
          onClick={() => {
            setActive(2);
          }}
        >
          SUV ({qtdSuv})
        </NavItem>
        <NavItem
          isActive={active === 3}
          onClick={() => {
            setActive(3);
          }}
        >
          Sedan ({qtdSedan})
        </NavItem>
        <NavItem
          isActive={active === 4}
          onClick={() => {
            setActive(4);
          }}
        >
          Estate ({qtdEstate})
        </NavItem>
      </Nav>

      <div className="carousel" ref={carousel}>
        {active === 1
          ? carData.map((row) => (
              <div className="item" key={row.id}>
                <CardCar
                  id={row.id}
                  bodyType={row.bodyType}
                  modelName={row.modelName}
                  modelType={row.modelType}
                  imageUrl={row.imageUrl}
                />
              </div>
            ))
          : active === 2
          ? carDataSuv.map((row) => (
              <div className="item" key={row.id}>
                <CardCar
                  id={row.id}
                  bodyType={row.bodyType}
                  modelName={row.modelName}
                  modelType={row.modelType}
                  imageUrl={row.imageUrl}
                />
              </div>
            ))
          : active === 3
          ? carDataSedan.map((row) => (
              <div className="item" key={row.id}>
                <CardCar
                  id={row.id}
                  bodyType={row.bodyType}
                  modelName={row.modelName}
                  modelType={row.modelType}
                  imageUrl={row.imageUrl}
                />
              </div>
            ))
          : carDataEstate.map((row) => (
              <div className="item" key={row.id}>
                <CardCar
                  id={row.id}
                  bodyType={row.bodyType}
                  modelName={row.modelName}
                  modelType={row.modelType}
                  imageUrl={row.imageUrl}
                />
              </div>
            ))}
      </div>
      {active !== 1 && carData.length > 5 ? (
        ""
      ) : (
        <Flex
          extend={{
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <IconButton
            aria-label="ArrowLeft"
            iconName="navigation-chevronback"
            intent="primary"
            onClick={handleLeftClick}
            variant="outline"
          />
          <Spacer />
          <IconButton
            aria-label="ArrowRight"
            iconName="navigation-chevronforward"
            intent="primary"
            onClick={handleRightClick}
            variant="outline"
          />
        </Flex>
      )}
    </View>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const response = await fetch("http://localhost:3000/api/cars.json");
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
