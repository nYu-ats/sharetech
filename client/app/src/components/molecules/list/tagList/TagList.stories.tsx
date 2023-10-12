import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./TagList";

export default {
  title: "Components/Molecules/List/TagList",
  component: Component,
  args: {
    tags: [
      { name: "Sample", searchLink: "#" },
      { name: "Sample2", searchLink: "#" },
      { name: "Sample3", searchLink: "#" },
    ],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
