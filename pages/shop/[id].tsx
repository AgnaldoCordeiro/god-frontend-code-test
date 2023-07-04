import { Col, Flex, Grid, IconButton, Row, Spacer, Text, View } from "vcc-ui";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
  description: string;
  sale: string;
  videoUrl: string;
}

interface ShopProps {
  car: Car;
}

export default function Shop({ car }: ShopProps) {
  const router = useRouter();
  return (
    <View>
      <Flex extend={{ alignItems: "start", padding: "2rem" }}>
        <IconButton
          aria-label="ArrowLeft"
          iconName="navigation-chevronback"
          intent="primary"
          onClick={() => router.push(`/`)}
          variant="outline"
        />
      </Flex>

      <Grid>
        <Row>
          <Col size={6}>
            <Flex
              extend={{
                padding: "2rem 0",
                justifyContent: "start",
              }}
            >
              <Text variant="bates">{car?.bodyType}</Text>
              <Flex
                extend={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "start",
                }}
              >
                <Text variant="peary">{car?.modelName}</Text>
                <Spacer />
                <Text variant="amundsen">{car?.modelType}</Text>
              </Flex>
            </Flex>
            <Image
              src={car.imageUrl}
              height={400}
              width={300}
              alt={car.modelName}
            />
            <Text variant="hillary">
              Only today: an unmissable deal for the car of your dreams!{" "}
              {car.sale}.
            </Text>
          </Col>

          <Col size={6}>
            <View>
              <Flex extend={{ alignItems: "start", padding: "2rem" }}>
                <Text variant="peary">
                  Discover perfection on wheels: the incredible {car.modelName}.
                </Text>
                <Spacer />
                <Text variant="hillary">
                  Designed to provide an exceptional driving experience, this
                  car combines elegant style, impressive performance, and
                  cutting-edge technology.{" "}
                </Text>
                <Spacer />
                <Text variant="hillary">
                  With aerodynamic lines and a modern design, the{" "}
                  {car.modelName} catches attention wherever it goes. Its
                  luxurious interior offers unparalleled comfort, with ergonomic
                  seats and high-quality materials. Every detail has been
                  carefully considered to create a refined and sophisticated
                  atmosphere.
                </Text>
                <Spacer />
                <Text variant="hillary">
                  But the {car.modelName} is not just about style - it also
                  delivers power and efficiency. Its state-of-the-art engine
                  provides smooth and rapid acceleration, while the hybrid
                  technology ensures impressive efficiency. You'll have the best
                  of both worlds: thrilling performance and fuel economy.
                </Text>
                <Spacer />
                <Text variant="hillary">
                  Additionally, the {car.modelName} is equipped with a wide
                  range of advanced technological features. From a
                  state-of-the-art infotainment system to intelligent safety
                  features, you'll always be connected, safe, and in control.
                </Text>
                <Spacer />
                <Text variant="hillary">
                  Don't miss the opportunity to own the car of your dreams.
                  Visit our shopping page right now and learn more about the
                  amazing {car.modelName}. Schedule a test drive and feel the
                  excitement of being behind the wheel of this magnificent
                  vehicle. Get ready for an extraordinary driving experience
                  that will exceed all your expectations.
                </Text>
              </Flex>
            </View>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;

  const response = await fetch("http://localhost:3000/api/cars.json");
  const data = await response.json();

  const carId = id as string; // ID do carro que você deseja buscar
  const carData = data.find((car: Car) => car.id === carId);

  const car = carData || null; // Corrigido aqui

  return {
    props: {
      car,
    },
  };
};
