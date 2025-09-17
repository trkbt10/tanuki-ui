import type { ComponentPropsWithoutRef, ElementType, JSX } from "react";

import { A, Anchor } from "./elements/Anchor";
import { Abbr } from "./elements/Abbr";
import { Address } from "./elements/Address";
import { Article } from "./elements/Article";
import { Aside } from "./elements/Aside";
import { Blockquote } from "./elements/Blockquote";
import { B } from "./elements/B";
import { Bdi } from "./elements/Bdi";
import { Bdo } from "./elements/Bdo";
import { Br } from "./elements/Br";
import { Button } from "./form/Button";
import { Fieldset } from "./form/Fieldset";
import { Caption } from "./elements/Caption";
import { Code } from "./elements/Code";
import { Cite } from "./elements/Cite";
import { Del } from "./elements/Del";
import { Details } from "./elements/Details";
import { Dfn } from "./elements/Dfn";
import { Div } from "./elements/Div";
import { Descriptions, Dl } from "./elements/Descriptions";
import { Dd } from "./elements/Dd";
import { Dt } from "./elements/Dt";
import { Em } from "./elements/Em";
import { Figure } from "./elements/Figure";
import { Figcaption } from "./elements/Figcaption";
import { Footer } from "./elements/Footer";
import { Form } from "./form/Form";
import { Heading, H1, H2, H3, H4, H5, H6 } from "./elements/Heading";
import { Header } from "./elements/Header";
import { HorizontalRule, Hr } from "./elements/HorizontalRule";
import { Image, Img } from "./elements/Image";
import { Input } from "./form/Input";
import { Ins } from "./elements/Ins";
import { Kbd } from "./elements/Kbd";
import { Label } from "./form/Label";
import { Legend } from "./form/Legend";
import { Li, List, ListItem, Ul } from "./elements/List";
import { Main } from "./elements/Main";
import { Mark } from "./elements/Mark";
import { Meter } from "./form/Meter";
import { Nav } from "./elements/Nav";
import { Ol } from "./elements/Ol";
import { Option } from "./form/Option";
import { Optgroup } from "./form/Optgroup";
import { Output } from "./form/Output";
import { P, Paragraph } from "./elements/Paragraph";
import { Pre } from "./elements/Pre";
import { Progress } from "./form/Progress";
import { Q } from "./elements/Q";
import { Ruby } from "./elements/Ruby";
import { Rt } from "./elements/Rt";
import { Samp } from "./elements/Samp";
import { Section } from "./elements/Section";
import { Selectbox, Selectbox as Select } from "./form/Selectbox";
import { Small } from "./elements/Small";
import { Span } from "./elements/Span";
import { S } from "./elements/S";
import { Strong } from "./elements/Strong";
import { Sub } from "./elements/Sub";
import { Summary } from "./elements/Summary";
import { Sup } from "./elements/Sup";
import { Table } from "./elements/Table";
import { Td } from "./elements/Td";
import { Textarea } from "./form/Textarea";
import { Th } from "./elements/Th";
import { Time } from "./blocks/Time";
import { Var } from "./elements/Var";
import { I } from "./elements/I";
import { U } from "./elements/U";
import { Wbr } from "./elements/Wbr";

type ComponentTypeOf<T> = T extends { readonly type: infer U }
  ? U extends ElementType
    ? U
    : never
  : T extends ElementType
  ? T
  : T extends { readonly render: infer U }
  ? ComponentTypeOf<U>
  : never;

type ComponentProps<T> = ComponentPropsWithoutRef<ComponentTypeOf<T>>;

type EnsureCompatible<
  Component,
  Tag extends keyof JSX.IntrinsicElements
> = ComponentProps<Component> extends JSX.IntrinsicElements[Tag] ? true : never;

type _EnsureArticle = EnsureCompatible<typeof Article, "article">;
type _EnsureSection = EnsureCompatible<typeof Section, "section">;
type _EnsureNav = EnsureCompatible<typeof Nav, "nav">;
type _EnsureMain = EnsureCompatible<typeof Main, "main">;
type _EnsureHeader = EnsureCompatible<typeof Header, "header">;
type _EnsureFooter = EnsureCompatible<typeof Footer, "footer">;
type _EnsureAside = EnsureCompatible<typeof Aside, "aside">;
type _EnsureAddress = EnsureCompatible<typeof Address, "address">;
type _EnsureParagraph = EnsureCompatible<typeof Paragraph, "p">;
type _EnsureP = EnsureCompatible<typeof P, "p">;
type _EnsureH1 = EnsureCompatible<typeof H1, "h1">;
type _EnsureH2 = EnsureCompatible<typeof H2, "h2">;
type _EnsureH3 = EnsureCompatible<typeof H3, "h3">;
type _EnsureH4 = EnsureCompatible<typeof H4, "h4">;
type _EnsureH5 = EnsureCompatible<typeof H5, "h5">;
type _EnsureH6 = EnsureCompatible<typeof H6, "h6">;
type _EnsureButton = EnsureCompatible<typeof Button, "button">;
type _EnsureInput = EnsureCompatible<typeof Input, "input">;
type _EnsureLabel = EnsureCompatible<typeof Label, "label">;
type _EnsureLegend = EnsureCompatible<typeof Legend, "legend">;
type _EnsureFieldset = EnsureCompatible<typeof Fieldset, "fieldset">;
type _EnsureTextarea = EnsureCompatible<typeof Textarea, "textarea">;
type _EnsureSelect = EnsureCompatible<typeof Selectbox, "select">;
type _EnsureOption = EnsureCompatible<typeof Option, "option">;
type _EnsureOptgroup = EnsureCompatible<typeof Optgroup, "optgroup">;
type _EnsureForm = EnsureCompatible<typeof Form, "form">;
type _EnsureProgress = EnsureCompatible<typeof Progress, "progress">;
type _EnsureMeter = EnsureCompatible<typeof Meter, "meter">;
type _EnsureOutput = EnsureCompatible<typeof Output, "output">;
type _EnsureTable = EnsureCompatible<typeof Table, "table">;
type _EnsureTh = EnsureCompatible<typeof Th, "th">;
type _EnsureTd = EnsureCompatible<typeof Td, "td">;
type _EnsureCaption = EnsureCompatible<typeof Caption, "caption">;
type _EnsureUl = EnsureCompatible<typeof Ul, "ul">;
type _EnsureLi = EnsureCompatible<typeof Li, "li">;
type _EnsureOl = EnsureCompatible<typeof Ol, "ol">;
type _EnsureDl = EnsureCompatible<typeof Dl, "dl">;
type _EnsureDd = EnsureCompatible<typeof Dd, "dd">;
type _EnsureDt = EnsureCompatible<typeof Dt, "dt">;
type _EnsureDetails = EnsureCompatible<typeof Details, "details">;
type _EnsureSummary = EnsureCompatible<typeof Summary, "summary">;
type _EnsureBlockquote = EnsureCompatible<typeof Blockquote, "blockquote">;
type _EnsureFigure = EnsureCompatible<typeof Figure, "figure">;
type _EnsureFigcaption = EnsureCompatible<typeof Figcaption, "figcaption">;
type _EnsurePre = EnsureCompatible<typeof Pre, "pre">;
type _EnsureDiv = EnsureCompatible<typeof Div, "div">;
type _EnsureA = EnsureCompatible<typeof A, "a">;
type _EnsureAnchor = EnsureCompatible<typeof Anchor, "a">;
type _EnsureImage = EnsureCompatible<typeof Image, "img">;
type _EnsureImg = EnsureCompatible<typeof Img, "img">;
type _EnsureTime = EnsureCompatible<typeof Time, "time">;
type _EnsureStrong = EnsureCompatible<typeof Strong, "strong">;
type _EnsureEm = EnsureCompatible<typeof Em, "em">;
type _EnsureSmall = EnsureCompatible<typeof Small, "small">;
type _EnsureSpan = EnsureCompatible<typeof Span, "span">;
type _EnsureB = EnsureCompatible<typeof B, "b">;
type _EnsureI = EnsureCompatible<typeof I, "i">;
type _EnsureU = EnsureCompatible<typeof U, "u">;
type _EnsureS = EnsureCompatible<typeof S, "s">;
type _EnsureMark = EnsureCompatible<typeof Mark, "mark">;
type _EnsureDel = EnsureCompatible<typeof Del, "del">;
type _EnsureIns = EnsureCompatible<typeof Ins, "ins">;
type _EnsureSub = EnsureCompatible<typeof Sub, "sub">;
type _EnsureSup = EnsureCompatible<typeof Sup, "sup">;
type _EnsureCode = EnsureCompatible<typeof Code, "code">;
type _EnsureKbd = EnsureCompatible<typeof Kbd, "kbd">;
type _EnsureSamp = EnsureCompatible<typeof Samp, "samp">;
type _EnsureVar = EnsureCompatible<typeof Var, "var">;
type _EnsureAbbr = EnsureCompatible<typeof Abbr, "abbr">;
type _EnsureCite = EnsureCompatible<typeof Cite, "cite">;
type _EnsureDfn = EnsureCompatible<typeof Dfn, "dfn">;
type _EnsureQ = EnsureCompatible<typeof Q, "q">;
type _EnsureRuby = EnsureCompatible<typeof Ruby, "ruby">;
type _EnsureRt = EnsureCompatible<typeof Rt, "rt">;
type _EnsureBdi = EnsureCompatible<typeof Bdi, "bdi">;
type _EnsureBdo = EnsureCompatible<typeof Bdo, "bdo">;
type _EnsureBr = EnsureCompatible<typeof Br, "br">;
type _EnsureWbr = EnsureCompatible<typeof Wbr, "wbr">;
// Dialog components add additional behavior and are exported from the main entry point.

export {
  A,
  Anchor,
  Abbr,
  Address,
  Article,
  Aside,
  Blockquote,
  Button,
  Fieldset,
  Caption,
  Code,
  Cite,
  Del,
  Details,
  Dfn,
  Div,
  Dl,
  Descriptions,
  Dd,
  Dt,
  Em,
  Figure,
  Figcaption,
  Footer,
  Form,
  Heading,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Header,
  HorizontalRule,
  Hr,
  Image,
  Img,
  Input,
  Ins,
  Kbd,
  Label,
  Legend,
  List,
  ListItem,
  Ul,
  Li,
  Main,
  Mark,
  Meter,
  Nav,
  Ol,
  Option,
  Optgroup,
  Output,
  Paragraph,
  P,
  Pre,
  Progress,
  Q,
  Ruby,
  Rt,
  Samp,
  Section,
  Selectbox,
  Select,
  Span,
  B,
  I,
  U,
  S,
  Small,
  Strong,
  Sub,
  Summary,
  Sup,
  Table,
  Td,
  Textarea,
  Th,
  Time,
  Bdi,
  Bdo,
  Br,
  Wbr,
  Var,
};
