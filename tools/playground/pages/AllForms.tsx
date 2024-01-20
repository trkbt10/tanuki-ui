import React from "react";
import { usePrevious } from "react-use";
import { useNativeAlertLikeInterface } from "../../src/dialogs/useNativeAlertLikeInterface";
import { Descriptions } from "../../src/elements/Descriptions";
import { Sortable } from "../../src/form/Sortable";
import { Button } from "../../src/form/Button";
import { Input } from "../../src/form/Input";
import { List, ListItem } from "../../src/elements/List";
import { Selectbox } from "../../src/form/Selectbox";
import { Textarea } from "../../src/form/Textarea";
import { Table } from "../../src/elements/Table";
import { Icon } from "../../src/blocks/Icon";
import { H1, H2, H3, H4, H5, H6 } from "../../src/elements/Heading";
import { BarItems, Toolbar } from "../../src/bars/Toolbar";
import { SidebarList } from "../../src/navigations/SidebarList";
import { Fieldset, Legend } from "../../src";
import { useDocument } from "../../src/hooks/useDocumentBody";

export const AllForms = () => {
  const uniqueId = React.useId();
  const [mountNode, setMountNode] = React.useState<HTMLElement>();
  const document = useDocument();
  React.useEffect(() => {
    if (!document) {
      return;
    }
    const element = document.createElement("div");
    element.setAttribute("id", uniqueId);
    document.body.appendChild(element);
    setMountNode(element);
    return () => {
      document.body.removeChild(element);
      setMountNode(undefined);
    };
  }, [uniqueId, document]);
  const [value, setValue] = React.useState(() => {
    return {
      nested: {
        item: "aa",
      },
    };
  });
  const prev = usePrevious(value);
  React.useEffect(() => {
    if (!prev) {
      return;
    }
    if (!value) {
      return;
    }
    console.log(value);
  }, [value]);
  const [items, setItems] = React.useState<{ name: string }[]>(() => [
    {
      name: "aa",
    },
    {
      name: "bb",
    },
    {
      name: "cc",
    },
  ]);
  const { alert, confirm, prompt, Outlet } = useNativeAlertLikeInterface();

  return (
    <>
      <Toolbar>
        <BarItems.Body>
          <BarItems.Title>
            <strong>Title</strong>
          </BarItems.Title>
          <BarItems.Body>
            <BarItems.SegmentedControl items={["a", "b", "c"]}></BarItems.SegmentedControl>
            <BarItems.PushButton>Done</BarItems.PushButton>
            <BarItems.ComboBox>
              <option value="B">B</option>
            </BarItems.ComboBox>
            <BarItems.PullDown>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </BarItems.PullDown>
            <BarItems.PopUpButton>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </BarItems.PopUpButton>
            <BarItems.SearchField></BarItems.SearchField>
          </BarItems.Body>
        </BarItems.Body>
      </Toolbar>
      <SidebarList.Container open>
        <SidebarList.SectionTitle title="hoge"></SidebarList.SectionTitle>
        <SidebarList.List>
          <SidebarList.ListItem label="a" />
          <SidebarList.ListItem label="b" />
          <SidebarList.ListItem label="c" />
          <SidebarList.ListItem label="d" />
        </SidebarList.List>
      </SidebarList.Container>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>

      <Icon src="activity"></Icon>

      <H3>Inputs</H3>
      <Selectbox>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </Selectbox>
      <Selectbox multiple>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </Selectbox>
      <Selectbox multiple data-variant="selectable" onChange={console.log}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>

        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>

        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
      </Selectbox>
      <H4>Checkbox</H4>
      <Input type="checkbox"></Input>
      <Input type="checkbox" defaultChecked></Input>
      <br />
      <Input type="checkbox" data-variant="switch"></Input>
      <Input type="checkbox" data-variant="switch" defaultChecked></Input>
      <br />
      <Input type="checkbox" data-variant="switch" data-size="small"></Input>
      <Input type="checkbox" data-variant="switch" data-size="small" defaultChecked></Input>
      <H4>Radio</H4>
      <Input type="radio"></Input>
      <Input type="radio" defaultChecked></Input>
      <H4>Text</H4>
      <Input type="text"></Input>
      <br />
      <Input type="text" defaultValue="hoge"></Input>
      <br />
      <Input type="text" placeholder="placeholder"></Input>
      <br />
      <Textarea defaultValue={"hoge\nfuga"}></Textarea>
      <H4>Boolean</H4>

      <Input type="range" min={0} max={100} defaultValue={50} placeholder="placeholder"></Input>
      <br />
      <H4>Fieldset</H4>
      <Fieldset>
        <Legend>Legend</Legend>
        Items
      </Fieldset>
      <Descriptions>
        <dt>Title</dt>
        <dd>Item</dd>
        <dt>Title</dt>
        <dd>Item</dd>
      </Descriptions>
      <H3>Dialog</H3>
      <Outlet></Outlet>
      <Button onClick={() => alert("Test")}>alert</Button>
      <Button
        onClick={() =>
          confirm("Test")
            .then((data) => {
              console.log("ok");
            })
            .catch(() => {
              console.log("cancel");
            })
        }
      >
        confirm
      </Button>
      <Button
        onClick={async () => {
          let person = await prompt("Please enter your name", "Harry Potter");
          if (person != null) {
            console.log("Hello " + person);
          }
        }}
      >
        prompt
      </Button>
      <H4>SOrtableList</H4>
      <List>
        <Sortable<{ name: string }> items={items} onChange={setItems}>
          {items.map((item, i) => {
            return (
              <ListItem
                key={i}
                label={
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      setItems((prev) => {
                        prev[i] = { ...item, name: e.target.value };
                        return [...prev];
                      })
                    }
                  />
                }
              ></ListItem>
            );
          })}
        </Sortable>
      </List>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>John</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Alice</td>
          </tr>
        </tbody>
      </Table>
      <Button
        onClick={() => {
          setItems((prev) => [...prev, { name: Math.random().toString() }]);
        }}
      >
        Add
      </Button>
    </>
  );
};
