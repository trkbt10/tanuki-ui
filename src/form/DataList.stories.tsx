import React from "react";
import { DataList } from "./DataList";
import { ComponentProps } from "react";

export default {
  title: "forms/dataList",
  component: DataList,
};
const sharedDataList = (
  <datalist id="ice-cream-flavors" data-keys="">
    <option value="0">Chocolate</option>
    <option value="1">Coconut</option>
    <option value="2">Mint</option>
    <option value="3">Strawberry</option>
    <option value="4">Vanilla</option>
    <option value="5">Caramel</option>
    <option value="6">Coffee</option>
    <option value="7">Peanut Butter</option>
    <option value="8">Cookies and Cream</option>
    <option value="9">Rocky Road</option>
    <option value="10">Salted Caramel</option>
    <option value="11">Mango</option>
    <option value="12">Raspberry</option>
    <option value="13">Pistachio</option>
    <option value="14">Lemon</option>
    <option value="15">Orange</option>
    <option value="16">Hazelnut</option>
    <option value="17">Butter Pecan</option>
    <option value="18">Blueberry</option>
    <option value="19">Cotton Candy</option>
    <option value="20">Stracciatella</option>
    <option value="21">Cherry</option>
    <option value="22">Banana</option>
    <option value="23">Matcha</option>
    <option value="24">Grape</option>
  </datalist>
);
export const Default = (args: ComponentProps<typeof DataList>) => {
  return (
    <>
      <DataList
        defaultValue="4"
        onChange={(e) => {
          console.log(e);
        }}
        list={"ice-cream-flavors"}
      ></DataList>
      {sharedDataList}
    </>
  );
};
export const Multiple = (args: ComponentProps<typeof DataList>) => {
  return (
    <>
      <DataList placeholder="IceCreamFlavors" multiple onChange={console.log} list={"ice-cream-flavors"}></DataList>
      {sharedDataList}
    </>
  );
};
