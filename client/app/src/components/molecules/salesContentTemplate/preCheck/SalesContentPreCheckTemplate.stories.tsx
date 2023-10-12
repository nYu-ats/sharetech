import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContentPreCheckTemplate";

export default {
  title: "Components/Molecules/SalesContentTemplate/PreCheck",
  component: Component,
  args: {
    title: "Sample",
    tags: [{ value: "sample" }, { value: "sample2" }, { value: "sample3" }],
    salesContents: [
      { title: "sample", contentType: "TEXT", content: "testtesttest" },
      { title: "sample", contentType: "PDF", content: null },
      { title: "sample", contentType: "MOVIE", content: null },
    ],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
