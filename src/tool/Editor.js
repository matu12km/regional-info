import React from "react";

import EditorJs from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./richEditorTools";

import {
  Button,
  Container,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addComment } from "../api/contentsApi";
import { useContents } from "../contexts/contentsContext";
import { useAuth } from "../contexts/authContext";
import { PrefectureArray } from "../data/prefectures";
import axios from "axios";

export const ReactEditor = () => {
  const { user } = useAuth();
  const { dispatch } = useContents();
  const [contentType, setContentType] = useState("");
  const [searchPrefecture, setSearchPrefecture] = useState("");
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [prefectures, setPrefectures] = useState("");
  const [dataPrefecture, setDataPrefecture] = useState("");
  const [municipalities, setMunicipalities] = useState("");
  const [dataMunicipalities, setDataMunicipalities] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (searchPrefecture !== "") {
      const getMunicipalitiesList = async () => {
        const result = await axios.get(
          "https://www.land.mlit.go.jp/webland/api/CitySearch?area=" +
            searchPrefecture
        );
        setMunicipalitiesList(result.data.data);
      };
      getMunicipalitiesList();
    }
    if (title !== "") {
      setTitle(title)
    }
  }, [searchPrefecture,title]);

  const instanceRef = React.useRef(null);

  async function handleSave() {
    const savedData = await instanceRef.current.save();
    if (user) {
      const toPost = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        contentType,
        prefectures: dataPrefecture,
        municipalities: dataMunicipalities,
        title,
        content: savedData,
      };
      addComment({ ...toPost });
      dispatch({
        type: "ADD_CONTENT",
        content: {
          ...toPost,
          createdAt: new Date(),
          id: Date(),
        },
      });
    } else if (!user) {
      alert("Sign in first");
    }

    console.log("savedData", savedData);
  }
  async function handleClear() {
    const clearData = await instanceRef.current.clear();
    setContentType("");
    setPrefectures("");
    setMunicipalities("");
    setTitle("");

    console.log("clearedData", clearData);
  }
  const contentTypeChange = (e) => {
    setContentType(e.currentTarget.value);
  };
  const prefecturesChange = (e) => {
    setPrefectures(e.currentTarget.value);
    setDataPrefecture(e.currentTarget[e.currentTarget.selectedIndex].innerText);
    let num = ("00" + e.currentTarget.value).slice(-2);
    setSearchPrefecture(num);
  };
  const municipalitiesChange = (e) => {
    setMunicipalities(e.currentTarget.value);
    setDataMunicipalities(
      e.currentTarget[e.currentTarget.selectedIndex].innerText
    );
  };
  const titleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      <Container maxW="container.lg">
        <VStack
          as="form"
          onSubmit={handleSave}
          p={4}
          pb={2}
          bg="white"
          rounded="md"
          shadow="md"
          alignItems="flex-start"
        >
          <FormControl id="contentType" isRequired>
            <div className="arign-right">
              <Button onClick={handleSave}>Save!</Button>
              <Button onClick={handleClear}>Clear!</Button>
            </div>
            <FormLabel>投稿の種類</FormLabel>
            <Select
              placeholder="投稿の種類を選んでください。"
              value={contentType}
              onChange={contentTypeChange}
            >
              <option>活動紹介</option>
              <option>イベントの宣伝</option>
              <option>町の紹介</option>
            </Select>
          </FormControl>
          <FormControl id="prefectures" isRequired>
            <FormLabel>都道府県</FormLabel>
            <Select
              placeholder="都道府県を選んでください。"
              value={prefectures}
              onChange={prefecturesChange}
            >
              {PrefectureArray.map((prefecture) => (
                <option key={prefecture.id} value={prefecture.id}>
                  {prefecture.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="municipalities" isRequired>
            <FormLabel>市町村</FormLabel>
            <Select
              placeholder="市町村を選んでください。"
              value={municipalities}
              onChange={municipalitiesChange}
            >
              {municipalitiesList === []
                ? ""
                : municipalitiesList.map((municipalitie) => (
                    <option key={municipalitie.id} value={municipalitie.id}>
                      {municipalitie.name}
                    </option>
                  ))}
            </Select>
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>タイトル</FormLabel>
            <Input
              value={title}
              onChange={titleChange}
              size="md"
              placeholder="投稿タイトル"
            />
          </FormControl>
          <FormControl id="content" isRequired>
            <FormLabel>記事</FormLabel>
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={EDITOR_JS_TOOLS}
              i18n={{
                messages: {},
              }}
              data={{
                time: new Date(),
                blocks: [
                  {
                    type: "header",
                    data: {
                      text: '記事を入力してください。',
                      level: 1,
                    },
                  },
                ],
                version: "2.12.4",
              }}
            />
          </FormControl>
        </VStack>
      </Container>
    </>
  );
};

//ReactDOM.render(<ReactEditor />, document.getElementById("root"));
