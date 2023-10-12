import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./ModalOverlay";

export default {
  title: "Components/Molecules/Modal/ModalOverlay",
  component: Component,
  args: {
    children: <div></div>,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
