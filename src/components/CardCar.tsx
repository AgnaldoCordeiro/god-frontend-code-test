import Image from "next/image";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  View,
} from "vcc-ui";
interface ICars {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export default function CardCar({
  id,
  modelName,
  bodyType,
  modelType,
  imageUrl,
}: ICars) {

  const router = useRouter();

  const handleButtonClickLearn = () => {   
    router.push(`/learn/${id}`);
  };
  const handleButtonClickShop = () => {   
    router.push(`/shop/${id}`);
  };

  return (
    <View
      extend={{
        maxWidth: "300px",
        maxHeight: "500px",
      }}
    >
      <Flex
        extend={{
          alignItems: "start",
        }}
      >
        <Text variant="bates">{bodyType}</Text>
      </Flex>
      <Spacer />
      <Flex
        extend={{
          flexDirection: "row",
        }}
      >
        <Text variant={"amundsen"}>{modelName}</Text>
        <Spacer />
        <Text>{modelType}</Text>
      </Flex>
      <Flex
        extend={{
          justifyContent: "center",
        }}
      >
        <Image src={imageUrl} alt="suv" height={"200px"} width={"100%"} />
      </Flex>

      <View
        extend={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="text" onClick={handleButtonClickLearn}>
          LEARN
          <Icon type="navigation-chevronforward-16" color="action" />
        </Button>
        <Button variant="text" onClick={handleButtonClickShop}>
          SHOP
          <Icon type="navigation-chevronforward-16" color="action" />
        </Button>
      </View>    
    </View>
  );
}
