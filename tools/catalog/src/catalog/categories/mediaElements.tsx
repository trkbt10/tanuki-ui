import React from 'react';
import * as TanukiUI from 'tanuki-ui';
import { ComponentDemo } from '../types';

// Media Elements
export const mediaElements: ComponentDemo[] = [
  {
    name: 'Img',
    description: '画像要素',
    category: 'media',
    component: TanukiUI.Img,
    examples: {
      basic: (
        <TanukiUI.Img 
          src="https://via.placeholder.com/150x100" 
          alt="プレースホルダー画像"
          width={150}
          height={100}
        />
      ),
      variations: [
        (
          <TanukiUI.Img 
            src="https://via.placeholder.com/300x200" 
            alt="大きな画像"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ),
        (
          <TanukiUI.Img 
            src="https://via.placeholder.com/100x100" 
            alt="正方形画像"
            style={{ borderRadius: '50%' }}
          />
        )
      ]
    }
  },
  {
    name: 'Figure',
    description: '図表要素',
    category: 'media',
    component: TanukiUI.Figure,
    examples: {
      basic: (
        <TanukiUI.Figure>
          <TanukiUI.Img 
            src="https://via.placeholder.com/200x150" 
            alt="サンプル図表"
            width={200}
            height={150}
          />
          <TanukiUI.Figcaption>図1: サンプル図表のキャプション</TanukiUI.Figcaption>
        </TanukiUI.Figure>
      ),
      variations: [
        (
          <TanukiUI.Figure>
            <TanukiUI.Pre>
              <TanukiUI.Code>
                {`function hello() {
  console.log("Hello, World!");
}`}
              </TanukiUI.Code>
            </TanukiUI.Pre>
            <TanukiUI.Figcaption>リスト1: Hello World関数の例</TanukiUI.Figcaption>
          </TanukiUI.Figure>
        )
      ]
    }
  },
  {
    name: 'Figcaption',
    description: '図表キャプション',
    category: 'media',
    component: TanukiUI.Figcaption,
    examples: {
      basic: (
        <TanukiUI.Figure>
          <TanukiUI.Img 
            src="https://via.placeholder.com/180x120" 
            alt="グラフ画像"
            width={180}
            height={120}
          />
          <TanukiUI.Figcaption>
            <TanukiUI.Strong>図2: </TanukiUI.Strong>
            月間アクセス数の推移（2024年）
          </TanukiUI.Figcaption>
        </TanukiUI.Figure>
      )
    }
  },
];