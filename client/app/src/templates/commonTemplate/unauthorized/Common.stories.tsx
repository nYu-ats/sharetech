import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./Common.template";

export default {
  title: "Components/Templates/Common/Unauthorized",
  component: Component,
  args: {
    hasFooter: true,
    children: <div className="w-full bg-whiteSmoke animate-pulse h-96"></div>,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
