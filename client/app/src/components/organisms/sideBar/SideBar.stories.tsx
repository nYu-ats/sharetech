import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SideBar";

export default {
  title: "Components/Organisms/SideBar/SideBar",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
