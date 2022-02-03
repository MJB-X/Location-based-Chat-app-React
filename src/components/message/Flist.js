import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { VStack, HStack, Text, Image, Avatar, Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/Config";
import { GiConsoleController } from "react-icons/gi";
import EmptyList from "../../assets/EmptyList.svg";

function Flist({ cuUser, myID }) {
  const [foundUsers, setFoundUsers] = useState([]);
  const [FriendList, setFriendList] = useState(foundUsers);
  const [search, setsearch] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const collectionRef = collection(db, "users");

  console.log("myId", myID);

  // Search Handler

  const searchHandler = (e) => {
    const keyword = e.target.value;
    if (search !== "") {
      const results = foundUsers.filter((user) => {
        return user.Name.toLowerCase().startsWith(keyword.toLowerCase());

        // Use the toLowerCase() method to make it case-insensitive
      });
      setFriendList(results);
    } else {
      setFriendList(foundUsers);
      // If the text field is empty, show all users
    }
    setsearch(keyword);
  };

  // _____________________________________________

  const getFlist = async () => {
    // To fetch Friend list From Login User
    let myFriends = [];
    const docref = doc(db, "users", myID);
    await getDoc(docref).then((snap) => {
      if (snap.exists()) {
        myFriends = snap.data().FriendList;
        setisLoading(false);
      } else {
        console.log("No Friends Found");
      }
    });
    // _____________________________________________________

    // To filter the Friend list user From all user in DB

    let allu = [];
    await getDocs(collectionRef)
      .then((u) => {
        u.docs.map((doc) => {
          allu.push(doc.data());
        });

        const flist = allu.filter(
          (usr) => myFriends.includes(usr.Uid) && usr.Uid != myID
        );

        setFoundUsers(flist);
        setFriendList(flist);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // _____________________________________________________
  };

  useEffect(() => {
    getFlist();
  }, [myID]);

  return (
    <>
      <VStack w="500px" h="90vh" bg="#061731" p="20px">
        <Box width={"100%"}>
          <Text fontSize={"20px"} color={"white"} fontWeight={"bold"}>
            Messages
          </Text>
        </Box>

        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<RiSearch2Line color="white" />}
          />
          <Input
            type="tel"
            placeholder="Search Friends"
            color="white"
            value={search}
            onChange={(e) => {
              searchHandler(e);
            }}
          />
        </InputGroup>

        <VStack w="100%" paddingTop="10px" className="Flist">
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            ></Spinner>
          ) : FriendList.length > 0 ? (
            FriendList.map((doc, i) => {
              return (
                <>
                  <HStack
                    key={i}
                    w="100%"
                    borderRadius="5px"
                    justifyContent="space-between"
                    pr="10px"
                    bg="#081e3f"
                    className="Fprofile"
                    onClick={() => {
                      cuUser(doc);
                    }}
                  >
                    {" "}
                    <Box margin="10px">
                      <HStack>
                        {" "}
                        <Avatar size="md" name={doc.Name} src={doc.DP} />
                        <Text color="white">{doc.Name}</Text>
                      </HStack>
                    </Box>
                    {doc.IsActive ? (
                      <Text color="green.400">
                        <HiStatusOnline></HiStatusOnline>
                      </Text>
                    ) : (
                      <Text color="grey">
                        <HiStatusOffline></HiStatusOffline>
                      </Text>
                    )}{" "}
                  </HStack>
                </>
              );
            })
          ) : (
            <Box justifyContent={"center"} textAlign={"center"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                width="200"
                height="200"
                viewBox="0 0 647.63626 632.17383"
                xmlns="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#f2f2f2"
                />
                <path
                  d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#3f3d56"
                />
                <path
                  d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#6c63ff"
                />
                <circle cx="190.15351" cy="24.95465" r="20" fill="#6c63ff" />
                <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
                <path
                  d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#e6e6e6"
                />
                <path
                  d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#3f3d56"
                />
                <path
                  d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                  transform="translate(-276.18187 -133.91309)"
                  fill="#6c63ff"
                />
                <circle cx="433.63626" cy="105.17383" r="20" fill="#6c63ff" />
                <circle
                  cx="433.63626"
                  cy="105.17383"
                  r="12.18187"
                  fill="#fff"
                />
              </svg>
              <Text fontSize={"30px"} color={"grey"} fontWeight={"bold"}>
                Opps!!
              </Text>
              <Text fontSize={"15px"} color={"grey"} fontWeight={"bold"}>
                Your Friend List is Empty
              </Text>

              <Text fontSize={"15px"} color={"cyan.700"} fontWeight={"bold"}>
                Click on ➕ to add Friends
              </Text>
            </Box>
          )}
          {}
        </VStack>
      </VStack>
    </>
  );
}

export default Flist;
