import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./PullDown";

export default {
  title: "Components/Molecules/PullDown",
  component: Component,
  args: {
    selectedValue: "sample1",
    values: ["sample1", "sample2", "sample3"],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
