import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./NormalImage";
import SampleImage from "../../../../assets/images/siteLogo.png";

export default {
  title: "Components/Atoms/Image/NormalImage",
  component: Component,
  args: {
    src: SampleImage,
    alt: "Sample",
    width: 128,
    height: 32,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
