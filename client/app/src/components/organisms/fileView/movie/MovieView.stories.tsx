import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./MovieView";

export default {
  title: "Components/Organisms/FileView/Movie",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
