import { ComponentStory, ComponentMeta } from "@storybook/react";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import Component from "./MenuList";

export default {
  title: "Components/Molecules/List/MenuList",
  component: Component,
  args: {
    menus: [
      <NormalButton outline={true} children={<div>Sample</div>} />,
      <NormalButton outline={true} children={<div>Sample2</div>} />,
      <NormalButton outline={true} children={<div>Sample3</div>} />,
      <NormalButton outline={true} children={<div>Sample4</div>} />,
    ],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
