import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./FileUpload";

export default {
  title: "Components/Organisms/FileUpload",
  component: Component,
  args: { onFileDrop: ([]) => {}, targetFile: null },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
