import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./LoginPage.template";

export default {
  title: "Components/Templates/LoginPage",
  component: Component,
  args: {
    loginForm: <div className="w-full h-96 bg-whiteSmoke animate-pulse"></div>,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
