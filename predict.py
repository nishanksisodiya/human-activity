import pandas as pandas
import numpy as np
import tensorflow as tf

def get_result(inputs_batch):
	LABELS = ['Downstairs', 'Jogging', 'Sitting', 'Standing', 'Upstairs', 'Walking']
	frozen_graph = "./frozen_har.pb"
	with tf.gfile.GFile(frozen_graph, "rb") as f:
		restored_graph_def = tf.GraphDef()
		restored_graph_def.ParseFromString(f.read())

	with tf.Graph().as_default() as graph:
		tf.import_graph_def(
		restored_graph_def,
		input_map=None,
		return_elements=None,
		name=""
		)
	out = np.reshape(inputs_batch,  (1,200,3))
	y_ = graph.get_tensor_by_name("y_:0")
	input = graph.get_tensor_by_name("input:0")
	sess = tf.Session(graph=graph)
	feed_input = {input:out}
	result = sess.run(y_, feed_dict=feed_input)
	result = list(result[0])

	return LABELS[result.index(max(result))]

