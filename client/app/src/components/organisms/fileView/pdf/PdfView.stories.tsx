import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./PdfView";

export default {
  title: "Components/Organisms/FileView/Pdf",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
