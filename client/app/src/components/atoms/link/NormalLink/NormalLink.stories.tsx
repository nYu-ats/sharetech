import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./NormalLink";
import SampleImage from "../../../../assets/images/siteLogo.png";
import NormaImage from "components/atoms/image/NormalImage/NormalImage";

export default {
  title: "Components/Atoms/Link/NormalLink",
  component: Component,
  args: {
    anchor: "#",
    children: <p style={{ display: "inline-block" }}>Sample</p>,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const ImageLink = Template.bind({});
ImageLink.args = {
  children: (
    <div className="bg-deepBlue w-32">
      <NormaImage src={SampleImage} alt="Sample" width="w-32" />
    </div>
  ),
};
