import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  // 화면을 크게 했을 때도 모바일화면처럼 요소들이 가운데에 위치함
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    // 코인 이미지와 이름 가운데 정렬
    display: flex;
    align-items: center;
    //Link 크기에 padding을 넣어주면 Link가 커짐
    padding: 20px;
    // 글자색이 스으윽 바뀜
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const StyledLink = styled(Link)`
  color: rgba(0, 0, 0.5);
`;

const DarkBtn = styled.button`
  content: "다크모드";
  width: 70px;
  height: 30px;
  border-radius: 50px;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
`;

const Overview = styled.div``;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);
  // useQuery(query key, fetcher func)
  // useQuery가 isLoading값을 알아서 리턴함
  // fetchCoins가 끝나면 react query는 그 함수의 데이터를 data에 넣어줌
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  console.log(data);
  return (
    <Container>
      <Helmet>
        <Title>코인</Title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Overview>
          <DarkBtn onClick={toggleDarkAtom} />
          {isDark ? <div>Light Mode</div> : <div>Dark Mode</div>}
        </Overview>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <StyledLink
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </StyledLink>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
