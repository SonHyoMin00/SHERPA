import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styled from 'styled-components';
import MediaSelectOption from '../../organisms/MediaSelectOption';
import { TextField } from '@mui/material';
import Button from '../../atoms/Button';
import Select from '../../atoms/SelectOption';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://j9c107.p.ssafy.io' : 'http://j9c107.p.ssafy.io:8080';

const Container = styled.div`
  margin: 0 320px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
`;
const Box = styled.div`
  margin: 150px 0px 150px 0px;
`;
const Paragraph = styled.p`
  text-align: start;
`;
const RecommendSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;
  justify-content: space-between;
`;
const BudgetAdvertisement = styled.div`
  width: 45%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
const ChooseKindOfRecommend = styled.div`
  display: flex;
  width: 45%;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Choosesido = styled.div`
  width: 40%;
`;
const Choosedong = styled.div`
  width: 45%;
`;

export const MediaRecommendPage = () => {
  // 분류 관련 변수
  const [selectDataL, setSelectDataL] = useState(null);
  const [selectDataM, setSelectDataM] = useState(null);
  const [selectDataS, setSelectDataS] = useState(null);
  const [dataL, setDataL] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [dataS, setDataS] = useState([]);
  const defaultSelectL = useSelector((state) => state.user.productLarge);
  const defaultSelectM = useSelector((state) => state.user.productMedium);
  const defaultSelectS = useSelector((state) => state.user.productSmall);

  // 시/도 시/군/구 변수
  const [selectDataSido, setSelectDataSido] = useState([]);
  const [selectDataSigungu, setSelectDataSigungu] = useState([]);
  const [dataSido, setDataSido] = useState([]);
  const [dataSigungu, setDataSigungu] = useState([]);

  const [selectedButton, setSelectedButton] = useState('online');

  // 대분류, 중분류, 소분류 관련 effect들
  useLayoutEffect(() => {
    // console.log(defaultSelectL);
    // console.log(defaultSelectM);
    // console.log(defaultSelectS);
    // console.log(APPLICATION_SERVER_URL);

    const getDataL = async () => {
      try {
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/product/L/0`);
        if (response.data.success) {
          // console.log(response.data);
          setDataL(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getDataL();
  }, []);
  useEffect(() => {
    const selectedL = selectDataL !== null ? selectDataL : defaultSelectL;
    const getDataM = async () => {
      try {
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/product/M/${selectedL}`);
        if (response.data.success) {
          // console.log(response.data);
          setDataM(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };
    getDataM();
  }, [selectDataL, defaultSelectL]);
  useEffect(() => {
    const selectedM = selectDataM !== null ? selectDataM : defaultSelectM;
    const getDataS = async () => {
      try {
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/product/S/${selectedM}`);
        if (response.data.success) {
          // console.log(response.data);
          setDataS(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getDataS();
  }, [selectDataM, defaultSelectM]);

  //  시/도, 시/군/구 effect
  useLayoutEffect(() => {
    const getSido = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SERVER_URL}/api/area/sido/0`);
        if (response.data.success) {
          // console.log(response.data.data);
          setDataSido(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    getSido();
  }, []);
  useEffect(() => {
    const getSigungu = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SERVER_URL}/api/area/sigungu/${selectDataSido}`);
        if (response.data.success) {
          console.log(response.data);
          setDataSigungu(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getSigungu();
  }, [selectDataSido]);
  return (
    <Container>
      <h1>매체 추천</h1>
      <h3>광고품목에 적합한 매체를 추천해드립니다.</h3>
      <h3>품목</h3>
      <MediaSelectOption
        dataL={dataL}
        dataM={dataM}
        dataS={dataS}
        onSelectL={setSelectDataL}
        onSelectM={setSelectDataM}
        onSelectS={setSelectDataS}
        defaultSelectL={defaultSelectL}
        defaultSelectM={defaultSelectM}
        defaultSelectS={defaultSelectS}
      ></MediaSelectOption>
      <RecommendSelect>
        <BudgetAdvertisement>
          <Paragraph>내가 생각하는 광고 최대 예산</Paragraph>
          <TextField></TextField>
        </BudgetAdvertisement>
        <ChooseKindOfRecommend>
          <Paragraph>온/오프라인</Paragraph>
          <Buttons>
          <Button
            onClick={() => setSelectedButton('online')}
            backgroundColor={selectedButton === 'online' ? "#3C486B" : "white"}
            width="200px"
            height="50px"
            textColor={selectedButton === 'online' ? "white" : "#3C486B"}
            fontSize="24px"
            border={selectedButton !== 'online' ? "solid 1px" : "none"}
          >
            온라인
          </Button>
          <Button
            onClick={() => setSelectedButton('offline')}
            backgroundColor={selectedButton === 'offline' ? "#3C486B" : "white"}
            width="200px"
            height="50px"
            textColor={selectedButton === 'offline' ? "white" : "#3C486B"}
            fontSize="24px"
            border={selectedButton !== 'offline' ? "solid 1px" : "none"}
          >
            오프라인
          </Button>
          </Buttons>
        </ChooseKindOfRecommend>
        <Choosesido>
          <Paragraph>광고 지역 선택</Paragraph>
          <Select data={dataSido} onSelect={setSelectDataSido}  width="400px"></Select>
        </Choosesido>
        <Choosedong>
          <Paragraph>광고 상세 지역 선택</Paragraph>
          <Select data={dataSigungu} onSelect={setSelectDataSigungu} width="400px"></Select>
        </Choosedong>
      </RecommendSelect>
      <Box>
        <Button backgroundColor="#3C486B" width="30%" height="50px" textColor="white" fontSize="24px">
          추천받기
        </Button>
      </Box>
    </Container>
  );
};

export default MediaRecommendPage;
