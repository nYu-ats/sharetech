import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContent";

export default {
  title: "Components/Organisms/Card Group/SalesContentList",
  component: Component,
  args: {
    cards: [
      {
        iconKey: "RESEARCH",
        title: "Sample",
        tags: ["sample tag 1", "sample tag 2", "sample tag 3"],
      },
      {
        iconKey: "RESEARCH",
        title: "Sample2",
        tags: ["sample tag 1", "sample tag 2", "sample tag 3"],
      },
      {
        iconKey: "RESEARCH",
        title: "Sample3",
        tags: ["sample tag 1", "sample tag 2", "sample tag 3"],
      },
      {
        iconKey: "RESEARCH",
        title: "Sample4",
        tags: ["sample tag 1", "sample tag 2", "sample tag 3"],
      },
    ],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
