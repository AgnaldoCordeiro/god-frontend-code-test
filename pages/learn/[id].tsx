import VideoPlayer from "../../src/components/VideoPlayer";
import { Col, Flex, Grid, IconButton, Row, Spacer, Text, View } from "vcc-ui";
import { GetServerSideProps } from "next";
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

interface LearnProps {
  car: Car;
}

export default function Learn({ car }: LearnProps) {
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
            <VideoPlayer url={car?.videoUrl} />
          </Col>
          <Col size={6}>
            <View extend={{ alignItems: "center", padding: "2rem" }}>
              <Text variant="hillary">{car?.description}</Text>
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
