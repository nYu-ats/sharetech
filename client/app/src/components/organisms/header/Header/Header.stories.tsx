import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./Header";

export default {
  title: "Components/Organisms/Header/Header",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
