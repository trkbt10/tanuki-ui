import React, { ComponentProps } from "react";
import { Details } from "./Details";
import { Summary } from "./Summary";
import { Table } from "./Table";
import { Article } from "./Article";
import { Section } from "./Section";
import { Nav } from "./Nav";
import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Aside } from "./Aside";
import { Address } from "./Address";
import { Blockquote } from "./Blockquote";
import { Figure } from "./Figure";
import { Figcaption } from "./Figcaption";
import { Pre } from "./Pre";
import { Div } from "./Div";

export default {
  title: "elements",
  component: <></>,
};

export const table = () => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export const details = () => {
  return (
    <Details>
      <Summary>
        Summary <button>submit</button>
      </Summary>
      Item
    </Details>
  );
};

// Content Sectioning Elements
export const contentSectioning = () => {
  return (
    <Article>
      <Header>
        <h1>記事のタイトル</h1>
        <Nav>
          <a href="#section1">セクション1</a>
          <a href="#section2">セクション2</a>
        </Nav>
      </Header>

      <Main>
        <Section id="section1">
          <h2>セクション1</h2>
          <p>メインコンテンツです。</p>
        </Section>

        <Aside>
          <h3>サイドバー</h3>
          <p>関連情報</p>
        </Aside>
      </Main>

      <Footer>
        <Address>
          お問い合わせ: <a href="mailto:test@example.com">test@example.com</a>
        </Address>
      </Footer>
    </Article>
  );
};

// Text Content Elements
export const textContent = () => {
  return (
    <Div>
      <Blockquote cite="https://example.com">これは引用文です。重要な文章を引用する際に使用します。</Blockquote>

      <Figure>
        <img src="https://via.placeholder.com/300x200" alt="サンプル画像" />
        <Figcaption>図1: サンプル画像の説明</Figcaption>
      </Figure>

      <Pre>
        {`function hello() {
  console.log("Hello, World!");
}

hello();`}
      </Pre>
    </Div>
  );
};
