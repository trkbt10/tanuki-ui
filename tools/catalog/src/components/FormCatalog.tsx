import React, { useState } from "react";
import { components } from "../catalog/components";
import {
  H1,
  H2,
  H3,
  P,
  Section,
  Article,
  Form,
  Fieldset,
  Legend,
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Label,
  Progress,
  Meter,
  Output,
  DataList,
  Optgroup,
  H4,
} from "tanuki-ui";

const FormCatalog: React.FC = () => {
  // フォーム状態管理
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 25,
    bio: "",
    country: "",
    interests: [] as string[],
    newsletter: false,
    rating: 5,
    favoriteColor: "#000000",
  });

  const [submitResult, setSubmitResult] = useState("");

  // フォームデータ更新
  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // フォーム送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(JSON.stringify(formData, null, 2));
  };

  // フォーム関連コンポーネントを収集
  const formComponents = [...(components.form?.components || []), ...(components["form-additional"]?.components || [])];

  // 実際の動作するフォーム例
  const renderInteractiveForm = () => (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>基本情報</Legend>

        <Section>
          <Label htmlFor="name">お名前 *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="山田 太郎"
            required
          />
        </Section>

        <Section>
          <Label htmlFor="email">メールアドレス *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="example@email.com"
            required
          />
        </Section>

        <Section>
          <Label htmlFor="age">年齢: {formData.age}歳</Label>
          <Input
            id="age"
            type="range"
            min="18"
            max="100"
            value={formData.age}
            onChange={(e) => updateField("age", parseInt(e.target.value))}
          />
        </Section>
      </Fieldset>

      <Fieldset>
        <Legend>詳細情報</Legend>

        <Section>
          <Label htmlFor="country">国・地域</Label>
          <Select id="country" value={formData.country} onChange={(e) => updateField("country", e.target.value)}>
            <Option value="">選択してください</Option>
            <Optgroup label="アジア">
              <Option value="japan">日本</Option>
              <Option value="korea">韓国</Option>
              <Option value="china">中国</Option>
            </Optgroup>
            <Optgroup label="北米">
              <Option value="usa">アメリカ</Option>
              <Option value="canada">カナダ</Option>
            </Optgroup>
            <Optgroup label="ヨーロッパ">
              <Option value="uk">イギリス</Option>
              <Option value="france">フランス</Option>
              <Option value="germany">ドイツ</Option>
            </Optgroup>
          </Select>
        </Section>

        <Section>
          <Label htmlFor="bio">自己紹介</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="自己紹介をお書きください..."
            rows={4}
          />
        </Section>

        <Section>
          <Label htmlFor="favoriteColor">好きな色</Label>
          <Input
            id="favoriteColor"
            type="color"
            value={formData.favoriteColor}
            onChange={(e) => updateField("favoriteColor", e.target.value)}
          />
        </Section>
      </Fieldset>

      <Fieldset>
        <Legend>評価とその他</Legend>

        <Section>
          <Label htmlFor="rating">サービス評価 (1-10)</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="10"
            value={formData.rating}
            onChange={(e) => updateField("rating", parseInt(e.target.value))}
          />
          <Output htmlFor="rating">現在の評価: {formData.rating}/10</Output>
        </Section>

        <Section>
          <Progress value={formData.rating} max="10">
            評価: {formData.rating}/10
          </Progress>
        </Section>

        <Section>
          <Meter value={formData.rating} min="1" max="10" optimum="8">
            満足度: {formData.rating}/10
          </Meter>
        </Section>

        <Section>
          <Label>
            <Input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => updateField("newsletter", e.target.checked)}
            />
            ニュースレターを受け取る
          </Label>
        </Section>
      </Fieldset>

      <Section>
        <Button type="submit">送信</Button>
        <Button
          type="button"
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              age: 25,
              bio: "",
              country: "",
              interests: [],
              newsletter: false,
              rating: 5,
              favoriteColor: "#000000",
            });
            setSubmitResult("");
          }}
        >
          リセット
        </Button>
      </Section>
    </Form>
  );

  return (
    <Article>
      <Section>
        <H1>📝 Form Elements Catalog</H1>
        <P>Tanuki UIのフォーム要素を実際に動作する統合フォームで体験できます。</P>
      </Section>

      <Section>
        <H2>🚀 インタラクティブフォーム体験</H2>
        <P>下記のフォームは全てTanuki UIのコンポーネントで構築されています：</P>

        {renderInteractiveForm()}

        {submitResult && (
          <Section>
            <H3>📤 送信結果</H3>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "16px",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "14px",
              }}
            >
              {submitResult}
            </pre>
          </Section>
        )}
      </Section>

      <Section>
        <H2>📋 フォーム要素一覧</H2>
        <P>使用可能なフォームコンポーネント ({formComponents.length}個):</P>

        <Section>
          {formComponents.map((component) => (
            <Section key={component.name}>
              <H3>{component.name}</H3>
              <P>{component.description}</P>
              <Section>
                <>{component.examples.basic}</>
              </Section>
              {component.examples.variations && (
                <Section>
                  <H4>バリエーション:</H4>
                  {component.examples.variations.map((variation, index) => (
                    <Section key={index}>
                      <>{variation}</>
                    </Section>
                  ))}
                </Section>
              )}
            </Section>
          ))}
        </Section>
      </Section>

      <Section>
        <H2>💡 フォーム設計のベストプラクティス</H2>

        <Section>
          <H3>1. セマンティックHTML</H3>
          <P>Tanuki UIはHTMLの標準要素を基盤としているため、適切なセマンティクスが自動的に適用されます。</P>
        </Section>

        <Section>
          <H3>2. アクセシビリティ</H3>
          <P>Label要素とhtmlFor属性を使用することで、スクリーンリーダーでの利用が改善されます。</P>
        </Section>

        <Section>
          <H3>3. バリデーション</H3>
          <P>HTML5の標準バリデーション（required、type、min、maxなど）がそのまま使用できます。</P>
        </Section>

        <Section>
          <H3>4. プログレッシブエンハンスメント</H3>
          <P>基本的なHTML機能が動作し、JavaScriptでエンハンスされる設計です。</P>
        </Section>
      </Section>

      <Section>
        <H2>🎨 テーマとスタイリング</H2>
        <P>
          上部のテーマセレクターでテーマを変更すると、フォーム要素のスタイルも自動的に更新されます。
          CSS変数とテーマシステムにより一貫したデザインが維持されます。
        </P>
      </Section>
    </Article>
  );
};

export default FormCatalog;
